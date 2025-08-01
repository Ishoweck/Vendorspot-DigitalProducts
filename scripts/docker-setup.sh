#!/bin/bash

echo "🐳 Setting up Docker environment..."

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
  echo "Error: docker-compose.yml not found. Please ensure you're in the project root."
  exit 1
fi

# Build Docker images
echo "Building Docker images..."
docker-compose build

# Start services
echo "Starting services..."
docker-compose up -d

echo "✅ Docker setup complete!"
echo "Services running:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:5000"
echo "- Database: localhost:5432"
echo "- Redis: localhost:6379"
echo "- Mailhog: http://localhost:8025" 