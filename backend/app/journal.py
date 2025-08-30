from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Journal
from app.ai_integration import analyze_sentiment

journal_bp = Blueprint('journal', __name__)

@journal_bp.route('/entry', methods=['POST'])
@jwt_required()
def create_entry():
    try:
        user_id = int(get_jwt_identity())
        data = request.get_json()
        
        title = data.get('title')
        content = data.get('content')
        
        if not title or not content:
            return jsonify({'error': 'Title and content are required'}), 400
        
        # Analyze sentiment using AI
        sentiment = analyze_sentiment(content)
        
        entry = Journal(
            user_id=user_id,
            title=title,
            content=content,
            sentiment=sentiment
        )
        
        db.session.add(entry)
        db.session.commit()
        
        return jsonify({
            'message': 'Journal entry created successfully',
            'entry': {
                'id': entry.id,
                'title': entry.title,
                'content': entry.content,
                'sentiment': entry.sentiment,
                'created_at': entry.created_at.isoformat()
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@journal_bp.route('/entries', methods=['GET'])
@jwt_required()
def get_entries():
    try:
        user_id = int(get_jwt_identity())
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        entries = Journal.query.filter_by(user_id=user_id)\
            .order_by(Journal.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
        
        entry_list = [{
            'id': entry.id,
            'title': entry.title,
            'content': entry.content[:200] + '...' if len(entry.content) > 200 else entry.content,
            'sentiment': entry.sentiment,
            'created_at': entry.created_at.isoformat()
        } for entry in entries.items]
        
        return jsonify({
            'entries': entry_list,
            'total': entries.total,
            'pages': entries.pages,
            'current_page': page
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@journal_bp.route('/entry/<int:entry_id>', methods=['GET'])
@jwt_required()
def get_entry(entry_id):
    try:
        user_id = int(get_jwt_identity())
        
        entry = Journal.query.filter_by(id=entry_id, user_id=user_id).first()
        
        if not entry:
            return jsonify({'error': 'Entry not found'}), 404
        
        return jsonify({
            'entry': {
                'id': entry.id,
                'title': entry.title,
                'content': entry.content,
                'sentiment': entry.sentiment,
                'created_at': entry.created_at.isoformat()
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500