from app import create_app, db
from app.models import User, Mood, Journal, Habit, HabitLog, Payment

def init_database():
    app = create_app()
    with app.app_context():
        # Create all tables
        db.create_all()
        print("Database tables created successfully!")

if __name__ == '__main__':
    init_database()
