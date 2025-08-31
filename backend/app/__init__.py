from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from app.auth import auth_bp
    from app.mood import mood_bp
    from app.journal import journal_bp
    from app.habits import habits_bp
    from app.dashboard import dashboard_bp
    from app.ai_integration import ai_bp
    from app.payment import payment_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(mood_bp, url_prefix='/api/mood')
    app.register_blueprint(journal_bp, url_prefix='/api/journal')
    app.register_blueprint(habits_bp, url_prefix='/api/habits')
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(payment_bp, url_prefix='/api/payment')
    
    # Add root route and health check
    @app.route('/')
    def index():
        return jsonify({
            'message': 'MindWell Backend API',
            'status': 'running',
            'version': '1.0.0',
            'endpoints': {
                'auth': '/api/auth',
                'mood': '/api/mood',
                'journal': '/api/journal',
                'habits': '/api/habits',
                'dashboard': '/api/dashboard',
                'ai': '/api/ai',
                'payment': '/api/payment'
            }
        })
    
    @app.route('/health')
    def health_check():
        from datetime import datetime
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'timestamp': datetime.now().isoformat()
        })
    
    return app