#!/bin/bash

# Environment switcher for CalmFlow MindSpace Backend

if [ "$1" = "prod" ] || [ "$1" = "production" ]; then
    echo "🟢 Switching to PRODUCTION environment..."
    cp .env .env.current
    echo "✅ Production environment activated"
    echo "📋 Current settings:"
    echo "   - FLASK_ENV: production"
    echo "   - FLASK_DEBUG: False"
    echo "   - Paystack: LIVE keys"
    
elif [ "$1" = "staging" ] || [ "$1" = "stage" ]; then
    echo "🟡 Switching to STAGING environment..."
    cp .env.staging .env.current
    echo "✅ Staging environment activated"
    echo "📋 Current settings:"
    echo "   - FLASK_ENV: development"
    echo "   - FLASK_DEBUG: True"
    echo "   - Paystack: TEST keys"
    
elif [ "$1" = "status" ]; then
    echo "📊 Current Environment Status:"
    if [ -f ".env.current" ]; then
        echo "   - Active: .env.current"
        echo "   - FLASK_ENV: $(grep FLASK_ENV .env.current | cut -d'=' -f2)"
        echo "   - FLASK_DEBUG: $(grep FLASK_DEBUG .env.current | cut -d'=' -f2)"
        echo "   - Paystack: $(grep PAYSTACK_SECRET_KEY .env.current | cut -d'=' -f2 | cut -c1-8)..."
    else
        echo "   - No active environment file"
    fi
    
else
    echo "❌ Usage: $0 [prod|staging|status]"
    echo ""
    echo "Commands:"
    echo "  prod, production  - Switch to production environment"
    echo "  staging, stage    - Switch to staging environment"
    echo "  status           - Show current environment status"
    echo ""
    echo "Examples:"
    echo "  $0 prod          # Switch to production"
    echo "  $0 staging       # Switch to staging"
    echo "  $0 status        # Check current environment"
fi
