from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Habit, HabitLog
from datetime import datetime, timedelta

habits_bp = Blueprint('habits', __name__)

@habits_bp.route('/create', methods=['POST'])
@jwt_required()
def create_habit():
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        name = data.get('name')
        description = data.get('description', '')
        frequency = data.get('frequency', 'daily')
        goal = data.get('goal', 1)
        unit = data.get('unit', 'times')
        
        if not name:
            return jsonify({'error': 'Habit name is required'}), 400
        
        habit = Habit(
            user_id=user_id,
            name=name,
            description=description,
            frequency=frequency,
            goal=goal,
            unit=unit
        )
        
        db.session.add(habit)
        db.session.commit()
        
        return jsonify({
            'message': 'Habit created successfully',
            'habit': {
                'id': habit.id,
                'name': habit.name,
                'description': habit.description,
                'frequency': habit.frequency,
                'goal': habit.goal,
                'unit': habit.unit,
                'created_at': habit.created_at.isoformat()
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@habits_bp.route('/list', methods=['GET'])
@jwt_required()
def get_habits():
    try:
        user_id = int(get_jwt_identity())
        
        habits = Habit.query.filter_by(user_id=user_id).order_by(Habit.created_at.desc()).all()
        
        habit_list = []
        for habit in habits:
            # Get today's progress
            today = datetime.utcnow().date()
            today_logs = HabitLog.query.filter(
                HabitLog.habit_id == habit.id,
                HabitLog.logged_at >= datetime.combine(today, datetime.min.time())
            ).all()
            
            progress = sum(log.value for log in today_logs)
            completed = progress >= habit.goal
            
            habit_list.append({
                'id': habit.id,
                'name': habit.name,
                'description': habit.description,
                'frequency': habit.frequency,
                'goal': habit.goal,
                'unit': habit.unit,
                'today_progress': progress,
                'completed_today': completed,
                'created_at': habit.created_at.isoformat()
            })
        
        return jsonify({'habits': habit_list})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@habits_bp.route('/log', methods=['POST'])
@jwt_required()
def log_habit():
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        habit_id = data.get('habit_id')
        value = data.get('value', 1)
        
        if not habit_id:
            return jsonify({'error': 'Habit ID is required'}), 400
        
        # Verify habit belongs to user
        habit = Habit.query.filter_by(id=habit_id, user_id=user_id).first()
        if not habit:
            return jsonify({'error': 'Habit not found'}), 404
        
        habit_log = HabitLog(
            user_id=user_id,
            habit_id=habit_id,
            value=value,
            completed=value >= habit.goal
        )
        
        db.session.add(habit_log)
        db.session.commit()
        
        return jsonify({
            'message': 'Habit progress logged successfully',
            'log': {
                'id': habit_log.id,
                'habit_id': habit_log.habit_id,
                'value': habit_log.value,
                'completed': habit_log.completed,
                'logged_at': habit_log.logged_at.isoformat()
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500