import os
from dotenv import load_dotenv

# Load environment variables BEFORE importing app modules
load_dotenv()

from app import create_app

app = create_app()

if __name__ == '__main__':
    print("Starting CalmFlow MindSpace Backend...")
    print(f"Database URL: {os.getenv('DATABASE_URL', 'Not configured')}")
    app.run(debug=True, host='0.0.0.0', port=5001)