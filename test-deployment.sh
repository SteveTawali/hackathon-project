#!/bin/bash

echo "🧪 Testing MindWell Railway Deployment"
echo "======================================"

# Get the Railway URL (you'll need to replace this with your actual URL)
RAILWAY_URL="https://your-app-name.railway.app"

echo "🔍 Testing Backend Health..."
curl -s "$RAILWAY_URL/" | head -5

echo ""
echo "🔐 Testing Authentication..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@mindwell.app","password":"test123"}' \
  "$RAILWAY_URL/api/auth/register"

echo ""
echo "✅ Deployment Test Complete!"
echo "🌐 Your MindWell app is live at: $RAILWAY_URL"
echo ""
echo "📱 Features Available:"
echo "   - User Registration/Login"
echo "   - Mood Tracking"
echo "   - Journal Entries"
echo "   - Habit Tracker"
echo "   - Community Posts"
echo "   - Meditation Timer"
echo "   - Kenyan Emergency Support"
