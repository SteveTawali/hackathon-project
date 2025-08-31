import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    
    # Database configuration - explicitly use Railway's DATABASE_URL
    DATABASE_URL = os.environ.get('DATABASE_URL')
    print(f"DEBUG: DATABASE_URL from env: {DATABASE_URL}")
    
    if DATABASE_URL:
        SQLALCHEMY_DATABASE_URI = DATABASE_URL
        print(f"DEBUG: Using DATABASE_URL: {SQLALCHEMY_DATABASE_URI}")
    else:
        SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
        print(f"DEBUG: Using fallback SQLite: {SQLALCHEMY_DATABASE_URI}")
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-jwt-secret-here'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY') or 'your-openai-api-key-here'
    PAYSTACK_SECRET_KEY = os.environ.get('PAYSTACK_SECRET_KEY') or 'your-paystack-secret-key-here'
    PAYSTACK_PUBLIC_KEY = os.environ.get('PAYSTACK_PUBLIC_KEY') or 'your-paystack-public-key-here'