# MindWell Backend

Flask REST API backend for the MindWell mental wellness platform.

## Technology Stack

- **Flask** with SQLAlchemy ORM
- **MySQL** database with PyMySQL connector
- **JWT** authentication with Flask-JWT-Extended
- **OpenAI API** integration for AI features
- **Flask-CORS** for cross-origin requests

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database and API keys
```

3. Run the application:
```bash
python run.py
```

## Database Models

- **User**: Authentication and profile data
- **Mood**: Daily mood tracking entries
- **Journal**: Journal entries with AI sentiment analysis
- **Habit**: User-defined habits and goals
- **HabitLog**: Daily habit completion tracking

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login  
- `GET /profile` - Get user profile

### Mood Tracking (`/api/mood`)
- `POST /log` - Log mood entry
- `GET /history` - Get mood history
- `GET /stats` - Mood statistics and trends

### Journal (`/api/journal`)
- `POST /entry` - Create journal entry
- `GET /entries` - Get paginated entries
- `GET /entry/<id>` - Get specific entry

### Habits (`/api/habits`)
- `POST /create` - Create new habit
- `GET /list` - Get user habits
- `POST /log` - Log habit progress

### Dashboard (`/api/dashboard`)
- `GET /summary` - Complete dashboard data

### AI Features (`/api/ai`)
- `GET /affirmation` - Generate daily affirmation
- `GET /journal-prompt` - Get writing prompt
- `POST /analyze-sentiment` - Analyze text sentiment

## AI Integration

The backend integrates with OpenAI's GPT-3.5-turbo for:
- Sentiment analysis of journal entries
- Personalized affirmation generation
- Contextual journal writing prompts
- Wellness insights and recommendations

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- SQL injection prevention