from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models import User
import re

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        # Validation
        if not username or not email or not password:
            return jsonify({'error': 'Please fill in all required fields (username, email, and password)'}), 400
        
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters long. Please choose a stronger password.'}), 400
        
        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
            return jsonify({'error': 'Please enter a valid email address (e.g., user@example.com)'}), 400
        
        # Check if user exists
        if User.query.filter_by(username=username).first():
            return jsonify({'error': f'The username "{username}" is already taken. Please choose a different username.'}), 400
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': f'An account with the email "{email}" already exists. Please use a different email or try logging in instead.'}), 400
        
        # Create user
        user = User(username=username, email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Create token
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            'message': 'Account created successfully! Welcome to MindWell!',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Something went wrong while creating your account. Please try again.'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Please enter both your username/email and password'}), 400
        
        # Find user by username or email
        user = User.query.filter(
            (User.username == username) | (User.email == username)
        ).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid username/email or password. Please check your credentials and try again.'}), 401
        
        # Create token
        access_token = create_access_token(identity=str(user.id))
        
        return jsonify({
            'message': 'Welcome back to MindWell!',
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
        
    except Exception as e:
        return jsonify({'error': 'Something went wrong while signing you in. Please try again.'}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'Your account could not be found. Please try logging in again.'}), 404
        
        return jsonify({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'created_at': user.created_at.isoformat()
            }
        })
        
    except Exception as e:
        return jsonify({'error': 'Something went wrong while loading your profile. Please try again.'}), 500