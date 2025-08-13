#!/bin/bash

echo "🚀 Deploying Vendorspot Digital Products..."

# Check if directories exist
if [ ! -d "frontend" ] || [ ! -d "backend" ] || [ ! -d "shared" ]; then
  echo "Error: Required directories not found. Please ensure you're in the project root."
  exit 1
fi

# Build shared package first
echo "Building shared package..."
cd shared
npm run build
cd ..

# Build backend
echo "Building backend..."
cd backend
npm run build
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

echo "✅ Build complete!"
echo ""
echo "Deployment Instructions:"
echo "========================"
echo ""
echo "Backend (Render):"
echo "1. Connect your GitHub repo to Render"
echo "2. Create a new Web Service"
echo "3. Set build command: 'cd backend && npm install && npm run build'"
echo "4. Set start command: 'cd backend && npm start'"
echo "5. Add environment variables from backend/.env.example"
echo ""
echo "Frontend (Vercel):"
echo "1. Connect your GitHub repo to Vercel"
echo "2. Set framework preset to 'Next.js'"
echo "3. Set root directory to 'frontend'"
echo "4. Add environment variables from frontend/.env.example"
echo ""
echo "Don't forget to update CORS origins in backend config!" 