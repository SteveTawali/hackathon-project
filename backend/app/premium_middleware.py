from functools import wraps
from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity
from app.models import User

def require_premium(f):
    """Decorator to require premium subscription for routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            user_id = get_jwt_identity()
            if not user_id:
                return jsonify({'error': 'Authentication required'}), 401
            
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            if not user.is_premium():
                return jsonify({
                    'error': 'Premium subscription required',
                    'subscription_status': user.subscription_status,
                    'upgrade_url': '/pricing'
                }), 403
            
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500
    
    return decorated_function

def check_premium_status(f):
    """Decorator to check premium status but allow access with limited features"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            user_id = get_jwt_identity()
            if not user_id:
                return jsonify({'error': 'Authentication required'}), 401
            
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            # Add premium status to request context
            request.premium_user = user.is_premium()
            request.user = user
            
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Internal server error'}), 500
    
    return decorated_function
