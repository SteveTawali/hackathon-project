import os
from app import app

# Gunicorn configuration
bind = f"0.0.0.0:{os.environ.get('PORT', 5001)}"
workers = 2
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
max_requests = 1000
max_requests_jitter = 50
preload_app = True
