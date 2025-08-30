import os
from dotenv import load_dotenv

# Load environment variables BEFORE importing app modules
load_dotenv()

from app import create_app, db
from app.models import User, Mood, Journal, Habit, HabitLog

app = create_app()

# Create tables when the app starts
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")

if __name__ == '__main__':
    print("Starting CalmFlow MindSpace Backend...")
    print(f"Database URL: {os.getenv('DATABASE_URL', 'Not configured')}")
    app.run(debug=True, host='0.0.0.0', port=5001)