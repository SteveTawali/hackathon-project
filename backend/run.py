from app import app
import os

if __name__ == '__main__':
    # Get port from Railway environment variable
    port = int(os.environ.get('PORT', 5001))
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=False  # Set to False for production
    )