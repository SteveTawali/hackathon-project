from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Mood
from datetime import datetime, timedelta
from sqlalchemy import func

mood_bp = Blueprint('mood', __name__)

@mood_bp.route('/log', methods=['POST'])
@jwt_required()
def log_mood():
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        mood_value = data.get('mood')
        notes = data.get('notes', '')
        
        if not mood_value or mood_value < 1 or mood_value > 5:
            return jsonify({'error': 'Mood must be between 1 and 5'}), 400
        
        mood = Mood(user_id=user_id, mood=mood_value, notes=notes)
        db.session.add(mood)
        db.session.commit()
        
        return jsonify({
            'message': 'Mood logged successfully',
            'mood': {
                'id': mood.id,
                'mood': mood.mood,
                'notes': mood.notes,
                'created_at': mood.created_at.isoformat()
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mood_bp.route('/history', methods=['GET'])
@jwt_required()
def get_mood_history():
    try:
        user_id = int(get_jwt_identity())
        days = request.args.get('days', 7, type=int)
        
        start_date = datetime.utcnow() - timedelta(days=days)
        
        moods = Mood.query.filter(
            Mood.user_id == user_id,
            Mood.created_at >= start_date
        ).order_by(Mood.created_at.desc()).all()
        
        mood_history = [{
            'id': mood.id,
            'mood': mood.mood,
            'notes': mood.notes,
            'created_at': mood.created_at.isoformat()
        } for mood in moods]
        
        return jsonify({'moods': mood_history})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mood_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_mood_stats():
    try:
        user_id = int(get_jwt_identity())
        days = request.args.get('days', 30, type=int)
        
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Get average mood
        avg_mood = db.session.query(func.avg(Mood.mood)).filter(
            Mood.user_id == user_id,
            Mood.created_at >= start_date
        ).scalar()
        
        # Get mood distribution
        mood_distribution = db.session.query(
            Mood.mood,
            func.count(Mood.mood)
        ).filter(
            Mood.user_id == user_id,
            Mood.created_at >= start_date
        ).group_by(Mood.mood).all()
        
        distribution = {str(mood): count for mood, count in mood_distribution}
        
        return jsonify({
            'average_mood': round(avg_mood or 0, 2),
            'mood_distribution': distribution,
            'period_days': days
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500