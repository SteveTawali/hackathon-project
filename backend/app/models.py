from datetime import datetime
from app import db
import bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    email_verified = db.Column(db.Boolean, default=False)
    email_verification_token = db.Column(db.String(255), nullable=True)
    email_verification_expires = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    subscription_status = db.Column(db.String(20), default='free')  # free, premium, cancelled
    subscription_expires_at = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    moods = db.relationship('Mood', backref='user', lazy=True)
    journals = db.relationship('Journal', backref='user', lazy=True)
    habits = db.relationship('Habit', backref='user', lazy=True)
    habit_logs = db.relationship('HabitLog', backref='user', lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def is_premium(self):
        if self.subscription_status != 'premium':
            return False
        if self.subscription_expires_at and self.subscription_expires_at < datetime.utcnow():
            self.subscription_status = 'expired'
            db.session.commit()
            return False
        return True
    
    def generate_verification_token(self):
        import secrets
        import uuid
        from datetime import datetime, timedelta
        
        # Generate a secure token
        token = str(uuid.uuid4()) + secrets.token_urlsafe(32)
        self.email_verification_token = token
        self.email_verification_expires = datetime.utcnow() + timedelta(hours=24)
        return token
    
    def verify_email_token(self, token):
        if (self.email_verification_token == token and 
            self.email_verification_expires and 
            self.email_verification_expires > datetime.utcnow()):
            self.email_verified = True
            self.email_verification_token = None
            self.email_verification_expires = None
            return True
        return False

class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mood = db.Column(db.Integer, nullable=False)  # 1-5 scale
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    sentiment = db.Column(db.String(20))  # AI-analyzed sentiment
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    frequency = db.Column(db.String(20), nullable=False)  # daily, weekly, etc.
    goal = db.Column(db.Integer, default=1)
    unit = db.Column(db.String(20), default='times')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship
    logs = db.relationship('HabitLog', backref='habit', lazy=True)

class HabitLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    habit_id = db.Column(db.Integer, db.ForeignKey('habit.id'), nullable=False)
    value = db.Column(db.Integer, default=1)
    completed = db.Column(db.Boolean, default=False)
    logged_at = db.Column(db.DateTime, default=datetime.utcnow)

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    paystack_reference = db.Column(db.String(100), unique=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)  # Amount in kobo (smallest currency unit)
    currency = db.Column(db.String(3), default='KES')
    status = db.Column(db.String(20), default='pending')  # pending, success, failed
    payment_type = db.Column(db.String(20), default='subscription')  # subscription, one_time
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    payment_metadata = db.Column(db.JSON)  # Store additional payment data