from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import openai
import os
from config import Config

ai_bp = Blueprint('ai', __name__)

# Set OpenAI API key
openai.api_key = Config.OPENAI_API_KEY

def analyze_sentiment(text):
    """Analyze sentiment of text using OpenAI"""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a sentiment analysis expert. Analyze the emotional tone of the given text and respond with only one word: positive, negative, neutral, or mixed."},
                {"role": "user", "content": text}
            ],
            max_tokens=10,
            temperature=0.1
        )
        
        sentiment = response.choices[0].message.content.strip().lower()
        return sentiment if sentiment in ['positive', 'negative', 'neutral', 'mixed'] else 'neutral'
        
    except Exception as e:
        print(f"Sentiment analysis error: {e}")
        return 'neutral'

@ai_bp.route('/affirmation', methods=['GET'])
@jwt_required()
def generate_affirmation():
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a supportive wellness coach. Generate a positive, encouraging affirmation for mental wellness. Keep it under 50 words and make it personal and uplifting."},
                {"role": "user", "content": "Generate a daily affirmation for my mental wellness journey."}
            ],
            max_tokens=100,
            temperature=0.7
        )
        
        affirmation = response.choices[0].message.content.strip()
        
        return jsonify({'affirmation': affirmation})
        
    except Exception as e:
        print(f"Affirmation generation error: {e}")
        # Return fallback affirmation on error
        fallback_affirmations = [
            "You are resilient and capable of overcoming challenges.",
            "Each moment is a chance to choose peace and positivity.",
            "Your journey matters, and you're doing better than you know.",
            "You are stronger than you think and capable of amazing things.",
            "Every small step forward is progress worth celebrating."
        ]
        import random
        return jsonify({'affirmation': random.choice(fallback_affirmations)})

@ai_bp.route('/journal-prompt', methods=['GET'])
@jwt_required()
def generate_journal_prompt():
    try:
        mood = request.args.get('mood')
        
        mood_context = f" The user's current mood is {mood}/5." if mood else ""
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are a therapeutic writing coach. Generate a thoughtful journal prompt for mental wellness and self-reflection.{mood_context} Make it encouraging and introspective, under 100 words."},
                {"role": "user", "content": "Give me a journal writing prompt for today."}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        prompt = response.choices[0].message.content.strip()
        
        return jsonify({'prompt': prompt})
        
    except Exception as e:
        print(f"Journal prompt generation error: {e}")
        # Return fallback prompt on error
        fallback_prompts = [
            "Reflect on one thing that brought you peace today, no matter how small.",
            "What would you like to let go of, and what would you like to welcome into your life?",
            "Describe how you've grown in the past month, even in small ways.",
            "What are three things you're grateful for today, and how did they make you feel?",
            "Describe a moment today when you felt most like yourself. What was happening?"
        ]
        import random
        return jsonify({'prompt': random.choice(fallback_prompts)})

@ai_bp.route('/analyze-sentiment', methods=['POST'])
@jwt_required()
def analyze_text_sentiment():
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        sentiment = analyze_sentiment(text)
        
        return jsonify({
            'sentiment': sentiment,
            'ai_enabled': True
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500