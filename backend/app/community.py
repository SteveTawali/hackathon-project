from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, CommunityPost
from datetime import datetime

community_bp = Blueprint('community', __name__)

@community_bp.route('/posts', methods=['GET'])
def get_posts():
    """Get all community posts"""
    try:
        posts = CommunityPost.query.order_by(CommunityPost.created_at.desc()).all()
        return jsonify([{
            'id': post.id,
            'content': post.content,
            'author': post.author,
            'createdAt': post.created_at.isoformat() if post.created_at else None
        } for post in posts]), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch posts', 'message': str(e)}), 500

@community_bp.route('/posts', methods=['POST'])
def create_post():
    """Create a new community post"""
    try:
        data = request.get_json()
        
        if not data or not data.get('content'):
            return jsonify({'error': 'Content is required'}), 400
        
        content = data.get('content', '').strip()
        if len(content) == 0:
            return jsonify({'error': 'Content cannot be empty'}), 400
        
        if len(content) > 1000:
            return jsonify({'error': 'Content too long (max 1000 characters)'}), 400
        
        # Create new post
        post = CommunityPost(
            content=content,
            author=data.get('author', 'Anonymous'),
            created_at=datetime.utcnow()
        )
        
        db.session.add(post)
        db.session.commit()
        
        return jsonify({
            'id': post.id,
            'content': post.content,
            'author': post.author,
            'createdAt': post.created_at.isoformat()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to create post', 'message': str(e)}), 500

@community_bp.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    """Delete a community post (authenticated users only)"""
    try:
        post = CommunityPost.query.get_or_404(post_id)
        
        # Optional: Add authorization check if users can only delete their own posts
        # current_user_id = get_jwt_identity()
        # if post.user_id != current_user_id:
        #     return jsonify({'error': 'Unauthorized'}), 403
        
        db.session.delete(post)
        db.session.commit()
        
        return jsonify({'message': 'Post deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete post', 'message': str(e)}), 500

@community_bp.route('/posts/<int:post_id>/like', methods=['POST'])
@jwt_required()
def toggle_like(post_id):
    """Toggle like on a community post (authenticated users only)"""
    try:
        current_user_id = get_jwt_identity()
        post = CommunityPost.query.get_or_404(post_id)
        
        # Simple like toggle - in production, you'd want a separate likes table
        # For now, we'll just return success
        return jsonify({
            'message': 'Like toggled successfully',
            'post_id': post_id,
            'user_id': current_user_id
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to toggle like', 'message': str(e)}), 500
