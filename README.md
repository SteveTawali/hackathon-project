# MindWell - Mental Wellness Platform 🧠💙

A comprehensive mental health and wellness application designed for Kenya, featuring mood tracking, journaling, habit building, meditation tools, and crisis support resources.

## 🏗️ Project Structure

```
📁 MindWell/
├── 📁 backend/          # Flask REST API
│   ├── 📁 app/          # Application modules
│   ├── 📁 scripts/      # Development scripts
│   ├── config.py        # Configuration
│   ├── run.py          # Application entry point
│   └── requirements.txt # Dependencies
├── 📁 frontend/         # React TypeScript app
│   ├── 📁 src/          # Source code
│   ├── 📁 public/       # Public assets
│   └── package.json     # Dependencies
├── 📁 docs/            # Documentation
└── README.md           # This file
```

## 🚀 Quick Start

### Backend (Flask API)
```bash
cd backend
pip install -r requirements.txt
python run.py
# Server runs on http://localhost:5001
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
# Server runs on http://localhost:5173
```

### Development Scripts
```bash
# Start both servers
./backend/scripts/start-dev.sh

# Run integration tests
./backend/scripts/test-integration.sh
```

## 🌟 Features

### 🔐 **Secure Authentication**
- JWT-based user authentication
- Protected routes for personal data
- Secure token management

### 📊 **Dashboard**
- Personalized wellness overview
- Mood trend visualization
- Habit progress tracking
- Recent journal entries

### 😊 **Mood Tracking**
- Daily mood logging (1-5 scale)
- Historical mood trends
- Notes and context

### 📓 **AI-Powered Journaling**
- Secure journal entries
- AI sentiment analysis
- Writing prompts and suggestions

### ✅ **Habit Tracker**
- Custom habit creation
- Progress visualization
- Streak tracking
- Goal setting

### 🧘 **Meditation & Mindfulness**
- Guided breathing exercises
- Meditation timers
- Mindfulness resources

### 💬 **Community Support**
- Safe community posting
- Anonymous sharing options
- Mental health discussions

### 🆘 **Crisis Support (Kenya-Focused)**
- Kenya emergency services (999/112)
- Befrienders Kenya (+254 722 178 177)
- Mental Health Kenya resources
- Local crisis hotlines

## 🛡️ Security & Privacy

- **Authentication Required**: All personal features require login
- **Data Encryption**: Secure data transmission
- **Privacy First**: Personal data is protected and encrypted
- **Crisis Access**: Emergency resources remain publicly accessible

## 🇰🇪 Localized for Kenya

- Emergency numbers specific to Kenya
- Local mental health organizations
- Culturally appropriate resources
- Professional counseling referrals

## 🧪 Development

- **Backend**: Flask + SQLAlchemy + MySQL + OpenAI
- **Frontend**: React + TypeScript + Tailwind CSS + Vite
- **Authentication**: JWT tokens
- **Database**: MySQL with proper relationships
- **AI Integration**: OpenAI for sentiment analysis and affirmations

## 📱 Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface
- Progressive Web App capabilities

## 🎯 Hackathon Ready

This project is designed for demonstration and includes:
- Complete authentication flow
- Full-stack integration
- Professional UI/UX
- Real-world applicability
- Comprehensive feature set

## 🤝 Contributing

1. Choose your focus: `backend/` or `frontend/`
2. Follow the existing code structure
3. Ensure all features remain behind authentication
4. Test with both development servers

## 📞 Crisis Resources

**In Kenya, if you need immediate help:**
- **Emergency Services**: 999 or 112
- **Befrienders Kenya**: +254 722 178 177
- **Mental Health Kenya**: +254 722 518 497

---

**Built with ❤️ for mental wellness in Kenya**
