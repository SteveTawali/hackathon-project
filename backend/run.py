import os
from dotenv import load_dotenv

# Load environment variables BEFORE importing app modules
# Only load .env file if it exists, don't load .env.example
load_dotenv('.env')

print("DEBUG: Environment variables after load_dotenv:")
print(f"DEBUG: DATABASE_URL = {os.getenv('DATABASE_URL', 'NOT SET')}")
print(f"DEBUG: All env vars: {dict(os.environ)}")

from app import create_app

app = create_app()

if __name__ == '__main__':
    print("Starting CalmFlow MindSpace Backend...")
    print(f"Database URL: {os.getenv('DATABASE_URL', 'Not configured')}")
    app.run(debug=True, host='0.0.0.0', port=5001)