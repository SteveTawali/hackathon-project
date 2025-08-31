from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Payment
from datetime import datetime, timedelta
import requests
import os
import hmac
import hashlib

payment_bp = Blueprint('payment', __name__)

def verify_paystack_webhook(payload, signature):
    """Verify Paystack webhook signature"""
    secret = os.getenv('PAYSTACK_SECRET_KEY')
    if not secret:
        return False
    
    # Create HMAC SHA512 hash
    hash = hmac.new(secret.encode('utf-8'), payload, hashlib.sha512).hexdigest()
    return hmac.compare_digest(hash, signature)

@payment_bp.route('/verify-payment', methods=['POST'])
@jwt_required()
def verify_payment():
    """Verify a payment with Paystack"""
    try:
        data = request.get_json()
        reference = data.get('reference')
        
        if not reference:
            return jsonify({'error': 'Reference is required'}), 400
        
        # Get user from JWT
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Verify payment with Paystack
        paystack_secret = os.getenv('PAYSTACK_SECRET_KEY')
        if not paystack_secret:
            return jsonify({'error': 'Payment service not configured'}), 500
        
        headers = {
            'Authorization': f'Bearer {paystack_secret}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get(
            f'https://api.paystack.co/transaction/verify/{reference}',
            headers=headers
        )
        
        if response.status_code != 200:
            return jsonify({'error': 'Failed to verify payment'}), 400
        
        paystack_data = response.json()
        
        if paystack_data['status'] and paystack_data['data']['status'] == 'success':
            # Payment successful
            transaction_data = paystack_data['data']
            
            # Check if payment already exists
            existing_payment = Payment.query.filter_by(paystack_reference=reference).first()
            if existing_payment:
                return jsonify({'error': 'Payment already processed'}), 400
            
            # Create payment record
            payment = Payment(
                user_id=user.id,
                paystack_reference=reference,
                amount=transaction_data['amount'],
                currency=transaction_data['currency'],
                status='success',
                metadata=transaction_data
            )
            
            # Update user subscription
            user.subscription_status = 'premium'
            # Set subscription to expire in 30 days (monthly subscription)
            user.subscription_expires_at = datetime.utcnow() + timedelta(days=30)
            
            db.session.add(payment)
            db.session.commit()
            
            return jsonify({
                'message': 'Payment verified successfully',
                'subscription_status': 'premium',
                'expires_at': user.subscription_expires_at.isoformat()
            })
        else:
            return jsonify({'error': 'Payment verification failed'}), 400
            
    except Exception as e:
        current_app.logger.error(f"Payment verification error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@payment_bp.route('/webhook', methods=['POST'])
def paystack_webhook():
    """Handle Paystack webhook events"""
    try:
        # Verify webhook signature
        signature = request.headers.get('X-Paystack-Signature')
        if not signature:
            return jsonify({'error': 'No signature provided'}), 400
        
        payload = request.get_data()
        if not verify_paystack_webhook(payload, signature):
            return jsonify({'error': 'Invalid signature'}), 400
        
        data = request.get_json()
        event = data.get('event')
        
        if event == 'charge.success':
            transaction_data = data['data']
            reference = transaction_data['reference']
            
            # Check if payment already processed
            existing_payment = Payment.query.filter_by(paystack_reference=reference).first()
            if existing_payment:
                return jsonify({'status': 'already_processed'})
            
            # Find user by email (Paystack sends customer email)
            customer_email = transaction_data.get('customer', {}).get('email')
            if not customer_email:
                return jsonify({'error': 'No customer email found'}), 400
            
            user = User.query.filter_by(email=customer_email).first()
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            # Create payment record
            payment = Payment(
                user_id=user.id,
                paystack_reference=reference,
                amount=transaction_data['amount'],
                currency=transaction_data['currency'],
                status='success',
                metadata=transaction_data
            )
            
            # Update user subscription
            user.subscription_status = 'premium'
            user.subscription_expires_at = datetime.utcnow() + timedelta(days=30)
            
            db.session.add(payment)
            db.session.commit()
            
            current_app.logger.info(f"Payment processed successfully for user {user.id}")
            
        return jsonify({'status': 'success'})
        
    except Exception as e:
        current_app.logger.error(f"Webhook error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@payment_bp.route('/subscription-status', methods=['GET'])
@jwt_required()
def get_subscription_status():
    """Get current user's subscription status"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'subscription_status': user.subscription_status,
            'is_premium': user.is_premium(),
            'expires_at': user.subscription_expires_at.isoformat() if user.subscription_expires_at else None
        })
        
    except Exception as e:
        current_app.logger.error(f"Subscription status error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@payment_bp.route('/cancel-subscription', methods=['POST'])
@jwt_required()
def cancel_subscription():
    """Cancel user's subscription"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user.subscription_status = 'cancelled'
        db.session.commit()
        
        return jsonify({
            'message': 'Subscription cancelled successfully',
            'subscription_status': 'cancelled'
        })
        
    except Exception as e:
        current_app.logger.error(f"Cancel subscription error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@payment_bp.route('/payment-history', methods=['GET'])
@jwt_required()
def get_payment_history():
    """Get user's payment history"""
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        payments = Payment.query.filter_by(user_id=user_id).order_by(Payment.created_at.desc()).all()
        
        payment_history = []
        for payment in payments:
            payment_history.append({
                'id': payment.id,
                'reference': payment.paystack_reference,
                'amount': payment.amount,
                'currency': payment.currency,
                'status': payment.status,
                'created_at': payment.created_at.isoformat(),
                'payment_type': payment.payment_type
            })
        
        return jsonify({'payments': payment_history})
        
    except Exception as e:
        current_app.logger.error(f"Payment history error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
