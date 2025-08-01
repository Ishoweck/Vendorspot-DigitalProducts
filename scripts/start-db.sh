#!/bin/bash

echo "Starting database services..."

# Start PostgreSQL and Redis
docker-compose up -d postgres redis

echo "Database services started!"
echo "- PostgreSQL: localhost:5432"
echo "- Redis: localhost:6379"
echo ""
echo "To stop services: docker-compose down" 