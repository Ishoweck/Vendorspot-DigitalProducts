#!/bin/bash

echo "🗄️ Resetting database..."

# Check if backend directory exists
if [ ! -d "backend" ]; then
  echo "Error: backend directory not found. Please ensure you're in the project root."
  exit 1
fi

cd backend

# Check if Prisma schema exists
if [ ! -f "prisma/schema.prisma" ]; then
  echo "Error: Prisma schema not found at backend/prisma/schema.prisma"
  exit 1
fi

# Reset database
echo "Resetting database..."
npx prisma migrate reset --force

# Run migrations
echo "Running migrations..."
npx prisma migrate dev

# Generate client
echo "Generating Prisma client..."
npx prisma generate

# Seed database
echo "Seeding database..."
npm run db:seed

cd ..

echo "✅ Database reset complete!" 