# Production Deployment Guide

## 🚀 Current Deployment

**Frontend:** Deployed on Netlify
**Backend:** Deployed on Railway  
**Database:** MySQL on Railway

## 🔧 Environment Configuration

### Backend Production Setup (Railway)

1. **Environment Variables in Railway Dashboard:**

```bash
# Flask Configuration
FLASK_APP=run.py
FLASK_ENV=production
FLASK_DEBUG=False

# Database Configuration (Railway MySQL)
DATABASE_URL=${{ MySQL.MYSQL_URL }}

# Security Keys (PRODUCTION KEYS - KEEP SECURE!)
SECRET_KEY=your-production-secret-key-here
JWT_SECRET_KEY=your-production-jwt-secret-key-here

# AI Integration
OPENAI_API_KEY=your-openai-api-key

# Paystack Configuration (PRODUCTION KEYS)
PAYSTACK_SECRET_KEY=sk_live_your_production_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_live_your_production_public_key_here
```

2. **Generate secure production keys:**
```bash
# Generate SECRET_KEY
python3 -c "import secrets; print(secrets.token_hex(32))"

# Generate JWT_SECRET_KEY
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### Frontend Production Setup (Netlify)

1. **Environment Variables in Netlify Dashboard:**

```bash
# Frontend Environment Variables
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_production_public_key_here
VITE_API_BASE_URL=https://hackathon-project-production-d817.up.railway.app
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

2. **Netlify Configuration (netlify.toml):**
```toml
[build]
  base = "frontend"
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🚀 Deployment Steps

### 1. Backend Deployment

```bash
# Install production dependencies
pip install -r requirements.txt

# Set production environment
export FLASK_ENV=production
export FLASK_DEBUG=False

# Run with production server (Gunicorn recommended)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5001 run:app
```

### 2. Frontend Deployment

```bash
# Build for production
npm run build

# Serve static files (using nginx or similar)
# The built files will be in the 'dist' directory
```

### 3. Database Setup

```sql
-- Create production database
CREATE DATABASE calmflow_mindspace_prod;

-- Create user with proper permissions
CREATE USER 'calmflow_prod'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON calmflow_mindspace_prod.* TO 'calmflow_prod'@'localhost';
FLUSH PRIVILEGES;
```

## 🔐 Security Configuration

### 1. Paystack Webhook Setup

1. **Go to Paystack Dashboard:**
   - Navigate to Settings > Webhooks
   - Add webhook URL: `https://your-domain.com/api/payment/webhook`
   - Select events: `charge.success`
   - Save the webhook

2. **Test webhook:**
   - Use Paystack's webhook testing tool
   - Verify signature validation is working

### 2. SSL/HTTPS Setup

```bash
# Install SSL certificate (Let's Encrypt recommended)
sudo certbot --nginx -d your-domain.com

# Configure nginx for HTTPS
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. Environment Security

```bash
# Set proper file permissions
chmod 600 .env
chmod 600 .env.production

# Use environment variables in production
export SECRET_KEY="your-secret-key"
export JWT_SECRET_KEY="your-jwt-secret"
export PAYSTACK_SECRET_KEY="your-paystack-secret"
```

## 📊 Monitoring & Logging

### 1. Application Logs

```bash
# Set up log rotation
sudo logrotate /etc/logrotate.d/calmflow

# Monitor application logs
tail -f /var/log/calmflow/app.log
```

### 2. Database Monitoring

```sql
-- Monitor database performance
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Threads_connected';
```

### 3. Payment Monitoring

- Monitor Paystack dashboard for failed transactions
- Set up alerts for webhook failures
- Track subscription status changes

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          # Deploy backend code
          # Restart services
          
      - name: Deploy Frontend
        run: |
          # Build frontend
          # Deploy to CDN/static hosting
```

## 🧪 Testing Production

### 1. Payment Testing

```bash
# Test with Paystack test cards
Card: 4084 0840 8408 4081
Expiry: Any future date
CVV: Any 3 digits
```

### 2. API Testing

```bash
# Test health endpoint
curl https://your-domain.com/health

# Test payment endpoints
curl https://your-domain.com/api/payment/subscription-status
```

### 3. Feature Testing

- Test premium feature access
- Verify payment processing
- Check subscription management
- Test webhook handling

## 📈 Performance Optimization

### 1. Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX idx_user_email ON user(email);
CREATE INDEX idx_payment_reference ON payment(paystack_reference);
CREATE INDEX idx_subscription_status ON user(subscription_status);
```

### 2. Caching

```python
# Add Redis caching for frequently accessed data
import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Cache subscription status
def get_user_subscription(user_id):
    cache_key = f"subscription:{user_id}"
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    # ... fetch from database
```

## 🚨 Emergency Procedures

### 1. Rollback Plan

```bash
# Rollback to previous version
git checkout HEAD~1
# Restart services
sudo systemctl restart calmflow-backend
```

### 2. Database Backup

```bash
# Create backup
mysqldump -u calmflow_prod -p calmflow_mindspace_prod > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
mysql -u calmflow_prod -p calmflow_mindspace_prod < backup_file.sql
```

## 📞 Support & Maintenance

### 1. Monitoring Alerts

- Set up uptime monitoring
- Configure error alerting
- Monitor payment failures

### 2. Regular Maintenance

- Weekly database backups
- Monthly security updates
- Quarterly performance reviews

### 3. Support Contacts

- Paystack Support: support@paystack.com
- OpenAI Support: https://help.openai.com/
- Your Development Team: [Your Contact Info]
