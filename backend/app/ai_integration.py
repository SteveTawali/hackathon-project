from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from openai import OpenAI
import os
from config import Config

ai_bp = Blueprint('ai', __name__)

# Initialize OpenAI client
client = OpenAI(api_key=Config.OPENAI_API_KEY) if Config.OPENAI_API_KEY and Config.OPENAI_API_KEY != 'your-openai-api-key-here' else None

def analyze_sentiment(text):
    """Analyze sentiment of text using OpenAI"""
    if not client:
        print("OpenAI client not configured, returning neutral sentiment")
        return 'neutral'
    
    try:
        response = client.chat.completions.create(
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
    if not client:
        # Return a fallback affirmation when OpenAI is not available
        fallback_affirmations = [
            "You are stronger than you think and capable of amazing things.",
            "Every small step forward is progress worth celebrating.",
            "You have the power to create positive change in your life.",
            "Your mental health journey is unique and valid.",
            "You deserve peace, happiness, and all good things.",
            "Today is a new opportunity to practice self-compassion.",
            "You are worthy of love and kindness, especially from yourself."
        ]
        import random
        return jsonify({'affirmation': random.choice(fallback_affirmations)})
    
    try:
        response = client.chat.completions.create(
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
            "Your journey matters, and you're doing better than you know."
        ]
        import random
        return jsonify({'affirmation': random.choice(fallback_affirmations)})

@ai_bp.route('/journal-prompt', methods=['GET'])
@jwt_required()
def generate_journal_prompt():
    if not client:
        # Return fallback prompts when OpenAI is not available
        fallback_prompts = [
            "What are three things you're grateful for today, and how did they make you feel?",
            "Describe a moment today when you felt most like yourself. What was happening?",
            "What challenge are you facing right now, and what strengths can you use to address it?",
            "Write about a person who made you smile recently. What did they do?",
            "If you could give advice to your past self from a week ago, what would it be?",
            "What emotion have you been carrying today? Where do you feel it in your body?",
            "Describe your ideal peaceful moment. What would it look, sound, and feel like?",
            "What's one small thing you did today that you're proud of?",
            "How did you practice self-care today, or how could you tomorrow?",
            "What pattern in your thoughts or behavior have you noticed lately?"
        ]
        import random
        return jsonify({'prompt': random.choice(fallback_prompts)})
    
    try:
        mood = request.args.get('mood')
        
        mood_context = f" The user's current mood is {mood}/5." if mood else ""
        
        response = client.chat.completions.create(
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
            "Describe how you've grown in the past month, even in small ways."
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
            'ai_enabled': client is not None
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500