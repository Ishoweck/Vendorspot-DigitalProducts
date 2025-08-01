#!/bin/bash

echo "🚀 Setting up Vendorspot Digital Products..."

# Check if directories exist
if [ ! -d "backend" ]; then
  echo "Error: backend directory not found. Please ensure you're in the project root."
  exit 1
fi

if [ ! -d "frontend" ]; then
  echo "Error: frontend directory not found. Please ensure you're in the project root."
  exit 1
fi

if [ ! -d "shared" ]; then
  echo "Error: shared directory not found. Please ensure you're in the project root."
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install || echo "Warning: Root dependencies installation failed, continuing..."
cd frontend && pnpm install && cd .. || echo "Warning: Frontend dependencies installation failed, continuing..."
cd backend && pnpm install && cd .. || echo "Warning: Backend dependencies installation failed, continuing..."
cd shared && pnpm install && cd .. || echo "Warning: Shared dependencies installation failed, continuing..."

# Create environment files
echo "Creating environment files..."
if [ ! -f "backend/.env" ]; then
  if [ -f "backend/.env.example" ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env from example"
  else
    echo "Create backend/.env manually"
  fi
fi

if [ ! -f "frontend/.env" ]; then
  if [ -f "frontend/.env.example" ]; then
    cp frontend/.env.example frontend/.env
    echo "Created frontend/.env from example"
  else
    echo "Create frontend/.env manually"
  fi
fi

# Generate Prisma client
echo "Setting up database..."
cd backend
if [ -f "prisma/schema.prisma" ]; then
  pnpm prisma generate
  echo "Prisma client generated successfully"
else
  echo "Error: Prisma schema not found at backend/prisma/schema.prisma"
fi
cd ..

echo "Setup complete! Next steps:"
echo "1. Configure environment variables in backend/.env and frontend/.env"
echo "2. Start PostgreSQL and Redis"
echo "3. Run: npm run db:migrate"
echo "4. Run: npm run dev" 