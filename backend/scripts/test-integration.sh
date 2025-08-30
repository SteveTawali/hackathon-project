#!/bin/bash

echo "🧪 MindWell Full-Stack Integration Test"
echo "======================================="
echo ""

# Wait a moment for servers to start
sleep 3

echo "🔍 Testing Frontend Server..."
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Frontend (React) running on http://localhost:5173"
else
    echo "❌ Frontend server not responding"
fi

echo ""
echo "🔍 Testing Backend Server..."
if curl -s http://localhost:5001/api/auth/profile > /dev/null; then
    echo "✅ Backend (Flask) running on http://localhost:5001"
else
    echo "❌ Backend server not responding"
fi

echo ""
echo "🔍 Testing Backend API Endpoints..."

echo "📊 Testing Dashboard endpoint..."
curl -s http://localhost:5001/api/dashboard/stats | jq . 2>/dev/null || echo "Dashboard response: $(curl -s http://localhost:5001/api/dashboard/stats)"

echo ""
echo "🤖 Testing AI Affirmation endpoint..."
curl -s http://localhost:5001/api/ai/affirmation | jq . 2>/dev/null || echo "Affirmation response: $(curl -s http://localhost:5001/api/ai/affirmation)"

echo ""
echo "🔐 Testing Registration endpoint..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}' \
  http://localhost:5001/api/auth/register | jq . 2>/dev/null || echo "Register response: $(curl -s -X POST -H "Content-Type: application/json" -d '{"username":"testuser","email":"test@example.com","password":"test123"}' http://localhost:5001/api/auth/register)"

echo ""
echo "🎉 Integration test complete!"
echo ""
echo "🌐 Open these URLs to test:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:5001/api"
echo ""
echo "💡 Use Ctrl+C to stop servers when done testing"
