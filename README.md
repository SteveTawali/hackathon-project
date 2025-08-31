# MindWell - Mental Wellness Platform

A comprehensive mental wellness application with Flask backend and React frontend, designed to help users track mood, maintain journals with AI insights, build healthy habits, practice meditation, and access crisis support resources.

## Project Structure

```
mindwell/
├── frontend/                 # React/Vite frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   ├── index.html         # Main HTML file
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
├── backend/                # Flask backend API
│   ├── app/               # Flask application
│   │   ├── models.py      # Database models
│   │   ├── auth.py        # Authentication routes
│   │   ├── mood.py        # Mood tracking routes
│   │   ├── journal.py     # Journal routes
│   │   ├── habits.py      # Habit tracking routes
│   │   ├── dashboard.py   # Dashboard routes
│   │   └── ai_integration.py  # AI features
│   ├── config.py          # App configuration
│   ├── requirements.txt   # Python dependencies
│   └── run.py            # Application entry point
└── README.md             # This file
```

## Features

### 🎯 Core Features
- **Mood Tracking**: Visual mood logging with trend analysis
- **AI-Powered Journal**: Rich text entries with sentiment analysis
- **Habit Tracking**: Comprehensive habit management with streaks
- **Meditation & Breathing**: Interactive exercises and timers
- **Crisis Support**: SOS resources and mental health tools
- **Dashboard**: Beautiful overview with charts and insights

### 🤖 AI Integration
- Sentiment analysis for journal entries
- Personalized daily affirmations
- Mood-based journal prompts
- Wellness insights and recommendations

### 🔒 Security Features
- JWT authentication with refresh tokens
- Password strength validation
- Input sanitization and validation
- CORS configuration
- Rate limiting

## Quick Start

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:8080`

### Backend Development

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
python run.py
```

The API will be available at `http://localhost:5000`

## Environment Configuration

### Backend (.env)
```env
FLASK_APP=run.py
FLASK_ENV=development
DATABASE_URL=mysql+pymysql://username:password@localhost/mindwell
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-here
OPENAI_API_KEY=your-openai-api-key-here
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Mood Tracking
- `POST /api/mood/log` - Log mood entry
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/stats` - Mood statistics

### Journal
- `POST /api/journal/entry` - Create journal entry
- `GET /api/journal/entries` - Get journal entries
- `GET /api/journal/entry/<id>` - Get specific entry

### Habits
- `POST /api/habits/create` - Create habit
- `GET /api/habits/list` - Get user habits
- `POST /api/habits/log` - Log habit progress

### AI Features
- `GET /api/ai/affirmation` - Generate affirmation
- `GET /api/ai/journal-prompt` - Get journal prompt
- `POST /api/ai/analyze-sentiment` - Analyze text sentiment

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **State Management**: TanStack Query
- **Routing**: React Router v6

### Backend
- **Framework**: Flask with SQLAlchemy
- **Database**: MySQL with PyMySQL
- **Authentication**: JWT with Flask-JWT-Extended
- **AI Integration**: OpenAI GPT-3.5-turbo
- **CORS**: Flask-CORS

## Development Guidelines

### Frontend
- Use semantic design tokens from the design system
- Follow component composition patterns
- Implement proper error handling and loading states
- Ensure accessibility compliance (WCAG 2.1)
- Mobile-first responsive design

### Backend
- Follow RESTful API conventions
- Implement comprehensive error handling
- Use proper HTTP status codes
- Validate all inputs
- Document API endpoints

## Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
cd backend
# Set production environment variables
# Deploy to your Python hosting service (Heroku, AWS, etc.)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

---

Made with ❤️ for mental wellness and self-care.
