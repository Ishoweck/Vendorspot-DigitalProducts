#!/bin/bash

echo "🚀 Deploying Vendorspot Digital Products..."

# Check if directories exist
if [ ! -d "frontend" ] || [ ! -d "backend" ] || [ ! -d "shared" ]; then
  echo "Error: Required directories not found. Please ensure you're in the project root."
  exit 1
fi

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Build backend
echo "Building backend..."
cd backend
npm run build
cd ..

# Build shared package
echo "Building shared package..."
cd shared
npm run build
cd ..

echo "✅ Build complete!"
echo "Next steps:"
echo "1. Copy dist folders to your server"
echo "2. Configure environment variables"
echo "3. Start the application with: npm start" 