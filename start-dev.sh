#!/bin/bash

echo "🚀 Starting MindWell Development Environment"
echo "============================================"
echo ""

# Check if we're on frontend branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📋 Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" = "frontend" ]; then
    echo "✅ On frontend branch - starting React app..."
    echo ""
    echo "🌐 Frontend will start on: http://localhost:5173"
    echo "📋 You'll need to start the backend separately on the 'backend' branch"
    echo ""
    echo "To start backend:"
    echo "1. Open a new terminal"
    echo "2. cd /Users/tawali/Hackathon/hackathon-project"
    echo "3. git stash (if needed)"
    echo "4. git checkout backend"
    echo "5. cd backend && python3 run.py"
    echo ""
    echo "Starting frontend in 3 seconds..."
    sleep 3
    
    cd frontend
    npm run dev
    
elif [ "$CURRENT_BRANCH" = "backend" ]; then
    echo "✅ On backend branch - starting Flask API..."
    echo ""
    echo "🔌 Backend will start on: http://localhost:5001"
    echo "📋 You'll need to start the frontend separately on the 'frontend' branch"
    echo ""
    echo "Starting backend..."
    cd backend
    python3 run.py
    
else
    echo "⚠️  You're on the '$CURRENT_BRANCH' branch"
    echo "Switch to either 'frontend' or 'backend' branch to start the respective server"
    echo ""
    echo "Available branches:"
    git branch -a
fi
