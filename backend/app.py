# Railway deployment fallback
# This file helps Railway detect and start the Flask application

from run import app
import os

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
