# MindWell - Mental Wellness Platform

A comprehensive mental wellness application with Flask backend and React frontend, designed to help users track mood, maintain journals with AI insights, build healthy habits, practice meditation, and access crisis support resources.

## Features

### 🎯 Core Features
- **Mood Tracking:** Visual mood logging with trend analysis and history.
- **AI-Powered Journal:** Rich text entries, sentiment analysis, and smart prompts.
- **Habit Tracking:** Create, manage, and log habits with streaks and progress visualization.
- **Meditation & Breathing:** Guided exercises, customizable timers, and relaxation tools.
- **Crisis Support:** SOS resources, emergency contacts, and mental health tools.
- **Dashboard:** Beautiful overview with charts, stats, and personalized insights.
- **Dark Mode:** Toggle between light and dark themes for comfort.
- **Authentication:** Secure login, registration, and user profile management.
- **Contact Us:** Built-in support form and direct contact options.

### 🤖 AI Integration
- Sentiment analysis for journal entries.
- Personalized daily affirmations.
- Mood-based journal prompts.
- Wellness insights and recommendations.

### 🔒 Security Features
- JWT authentication with refresh tokens.
- Password strength validation.
- Input sanitization and validation.
- CORS configuration.
- Rate limiting

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

## Screenshots & Demo

![Dashboard Screenshot](./screenshots/dashboard.png)
![Mood Tracker](./screenshots/mood tracker.png)
![Journal Screenshot](./screenshots/journal.png)
![Habit Tracker](./screenshots/habit tracker.png)
![Meditation](./screenshots/meditation.png)
![Pricing](./screenshots/pricing.png)
![Emergency](./screenshots/emergency.png)

## 🚀 Live Demo

**Frontend (Netlify):** [Your Netlify URL]
**Backend API (Railway):** https://hackathon-project-production-d817.up.railway.app

*Note: Replace "Your Netlify URL" with your actual Netlify deployment URL*

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/SteveTawali/hackathon-project.git
   ```
2. Install dependencies for frontend and backend (see instructions above).
3. Configure environment variables as needed.
4. Run frontend and backend servers.
5. Open your browser at `http://localhost:8080` (frontend) and `http://localhost:5000` (backend API).

---

## Usage Guide

- **Register/Login:** Create an account or log in to access personalized features.
- **Dashboard:** View your mood, habits, and recent journal entries.
- **Mood Tracking:** Log your mood daily and view trends.
- **Journal:** Write and analyze your thoughts with AI-powered insights.
- **Habits:** Track and manage your wellness habits.
- **Meditation:** Use guided exercises and timers for relaxation.
- **Community:** Post updates, interact, and support others.
- **SOS Support:** Access crisis resources and contact support.
- **Dark Mode:** Toggle theme for comfort.

---

## FAQ

**Q: Is MindWell free to use?**
A: Yes, core features are free. Premium features may require a subscription.

**Q: How is my data protected?**
A: All data is securely stored and never shared without your consent.

**Q: Can I use MindWell on mobile?**
A: Yes, the app is fully responsive and works on all devices.

---

## Roadmap

- [x] Core wellness features
- [x] Dark mode
- [ ] Community feed
- [ ] Mobile app
- [ ] More AI integrations
- [ ] Group support sessions
- [ ] Push notifications

---

## Credits

- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)
- All contributors and testers

---

## Contributors
Steven Gulu
Stephen Muhindi

---

## Contact & Support

For support, open an issue on GitHub or email [stephenmuhindi903@gmail.com](mailto:stephenmuhindi903@gmail.com).

---

## Changelog

- v1.0.0: Initial release

---

## License

This project is licensed under the MIT License.

---

Made with ❤️ for mental wellness and self-care.
