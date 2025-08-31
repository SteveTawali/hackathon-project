# Payment Integration Setup Guide

## Environment Variables Required

Add these environment variables to your `.env` file:

```bash
# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key_here
```

## Database Migration

After adding the new Payment model, you need to update your database:

1. **Option 1: Drop and recreate tables (for development)**
   ```bash
   # Stop the backend server
   # Delete the existing database or tables
   # Restart the server - tables will be recreated automatically
   ```

2. **Option 2: Manual migration (for production)**
   ```sql
   -- Add subscription fields to users table
   ALTER TABLE user ADD COLUMN subscription_status VARCHAR(20) DEFAULT 'free';
   ALTER TABLE user ADD COLUMN subscription_expires_at DATETIME NULL;
   
   -- Create payments table
   CREATE TABLE payment (
       id INT PRIMARY KEY AUTO_INCREMENT,
       user_id INT NOT NULL,
       paystack_reference VARCHAR(100) UNIQUE NOT NULL,
       amount INT NOT NULL,
       currency VARCHAR(3) DEFAULT 'KES',
       status VARCHAR(20) DEFAULT 'pending',
       payment_type VARCHAR(20) DEFAULT 'subscription',
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       metadata JSON,
       FOREIGN KEY (user_id) REFERENCES user(id)
   );
   ```

## Paystack Webhook Setup

1. **Get your Paystack keys:**
   - Go to your Paystack dashboard
   - Navigate to Settings > API Keys
   - Copy your Secret Key and Public Key

2. **Set up webhook URL:**
   - In Paystack dashboard, go to Settings > Webhooks
   - Add webhook URL: `https://your-domain.com/api/payment/webhook`
   - Select events: `charge.success`
   - Save the webhook

3. **Test the webhook:**
   - Use Paystack's webhook testing tool
   - Verify the signature is being validated correctly

## API Endpoints

### Payment Verification
- **POST** `/api/payment/verify-payment`
- Requires JWT token
- Body: `{"reference": "paystack_reference"}`

### Webhook Handler
- **POST** `/api/payment/webhook`
- Handles Paystack webhook events
- No authentication required (validates signature)

### Subscription Status
- **GET** `/api/payment/subscription-status`
- Requires JWT token
- Returns current subscription status

### Cancel Subscription
- **POST** `/api/payment/cancel-subscription`
- Requires JWT token
- Cancels user's premium subscription

### Payment History
- **GET** `/api/payment/payment-history`
- Requires JWT token
- Returns user's payment history

## Premium Feature Protection

Use the middleware decorators to protect premium features:

```python
from app.premium_middleware import require_premium, check_premium_status

@app.route('/premium-feature')
@jwt_required()
@require_premium
def premium_feature():
    # Only premium users can access this
    return jsonify({'message': 'Premium feature'})

@app.route('/limited-feature')
@jwt_required()
@check_premium_status
def limited_feature():
    # All users can access, but with different limits
    if request.premium_user:
        # Premium user gets full access
        return jsonify({'data': 'full_data'})
    else:
        # Free user gets limited access
        return jsonify({'data': 'limited_data'})
```

## Testing

1. **Test payment flow:**
   - Use Paystack test cards
   - Verify payment processing
   - Check subscription status updates

2. **Test webhook:**
   - Use Paystack webhook testing
   - Verify database updates
   - Check error handling

3. **Test premium protection:**
   - Try accessing premium features as free user
   - Verify proper error responses
   - Test upgrade flow

## Security Notes

- Always validate Paystack webhook signatures
- Store sensitive keys in environment variables
- Use HTTPS in production
- Implement proper error handling
- Log payment events for debugging
