from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Mood, Journal, Habit, HabitLog
from datetime import datetime, timedelta
from sqlalchemy import func

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/summary', methods=['GET'])
@jwt_required()
def get_dashboard_summary():
    try:
        user_id = int(get_jwt_identity())
        today = datetime.utcnow().date()
        week_ago = datetime.utcnow() - timedelta(days=7)
        
        # Mood data for the last 7 days
        mood_data = db.session.query(
            func.date(Mood.created_at).label('date'),
            func.avg(Mood.mood).label('avg_mood')
        ).filter(
            Mood.user_id == user_id,
            Mood.created_at >= week_ago
        ).group_by(func.date(Mood.created_at)).all()
        
        mood_trends = [{
            'date': str(item.date),
            'mood': round(item.avg_mood, 2)
        } for item in mood_data]
        
        # Today's mood
        todays_mood = Mood.query.filter(
            Mood.user_id == user_id,
            Mood.created_at >= datetime.combine(today, datetime.min.time())
        ).order_by(Mood.created_at.desc()).first()
        
        # Recent journal entries
        recent_entries = Journal.query.filter_by(user_id=user_id)\
            .order_by(Journal.created_at.desc())\
            .limit(3).all()
        
        entries_preview = [{
            'id': entry.id,
            'title': entry.title,
            'content': entry.content[:100] + '...' if len(entry.content) > 100 else entry.content,
            'sentiment': entry.sentiment,
            'created_at': entry.created_at.isoformat()
        } for entry in recent_entries]
        
        # Habit progress
        habits = Habit.query.filter_by(user_id=user_id).all()
        habit_progress = []
        
        for habit in habits:
            today_logs = HabitLog.query.filter(
                HabitLog.habit_id == habit.id,
                HabitLog.logged_at >= datetime.combine(today, datetime.min.time())
            ).all()
            
            progress = sum(log.value for log in today_logs)
            percentage = min((progress / habit.goal) * 100, 100) if habit.goal > 0 else 0
            
            habit_progress.append({
                'id': habit.id,
                'name': habit.name,
                'progress': progress,
                'goal': habit.goal,
                'unit': habit.unit,
                'percentage': round(percentage, 1),
                'completed': progress >= habit.goal
            })
        
        return jsonify({
            'mood_trends': mood_trends,
            'todays_mood': {
                'mood': todays_mood.mood if todays_mood else None,
                'notes': todays_mood.notes if todays_mood else None,
                'logged_at': todays_mood.created_at.isoformat() if todays_mood else None
            },
            'recent_entries': entries_preview,
            'habit_progress': habit_progress,
            'stats': {
                'total_entries': len(recent_entries),
                'active_habits': len(habits),
                'completed_habits_today': sum(1 for h in habit_progress if h['completed'])
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500