# Vendorspot Digital Products

Nigeria's most secure online marketplace for digital products. Discover trusted vendors, shop a wide range of digital products, and enjoy instant delivery with secure payment options.

## Features

- **Secure Digital Product Marketplace**: Safe, stress-free buying and selling of digital products
- **Trusted Vendor System**: Verified vendors with reputation scoring
- **Instant Digital Delivery**: Immediate access to purchased digital products
- **Secure Payment Processing**: Paystack integration for secure transactions
- **User Protection**: Anti-scam measures for both buyers and sellers
- **Responsive Design**: Mobile-first design with excellent user experience

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript (deployed on **Vercel**)
- **Backend**: Node.js with Express.js and TypeScript (deployed on **Render**)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with refresh tokens
- **File Storage**: Cloudinary for digital products and images
- **Payment Processing**: Paystack integration
- **Styling**: Tailwind CSS with responsive design

## Project Structure

```
vendorspot-digital-products/
├── frontend/                 # Next.js frontend application
├── backend/                  # Node.js/Express.js API server
├── shared/                   # Shared types and utilities
├── docs/                    # Documentation
└── scripts/                 # Deployment and utility scripts
```

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local installation or MongoDB Atlas account)
- pnpm (recommended) or npm

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd vendorspot-digital-products

# Install dependencies
pnpm install
# or
npm run install:all

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Configure MongoDB URI in backend/.env
# Start development environment
npm run dev
```

### Production Deployment

#### Backend (Render)

1. Connect GitHub repository to Render
2. Create new Web Service
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm start`
5. Add environment variables

#### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set framework preset to "Next.js"
3. Set root directory to "frontend"
4. Add environment variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vendorspot
JWT_SECRET=your-jwt-secret
PAYSTACK_SECRET_KEY=your-paystack-secret
PAYSTACK_PUBLIC_KEY=your-paystack-public-key
CLOUDINARY_URL=your-cloudinary-url
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.vercel.app
```

### Frontend (.env)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your-paystack-public-key
```

## Available Scripts

- `npm run dev` - Start both frontend and backend development servers
- `npm run dev:frontend` - Start only frontend development server
- `npm run dev:backend` - Start only backend development server
- `npm run build` - Build all packages for production
- `npm run lint` - Lint all packages

## Documentation

- [API Documentation](./docs/api.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request
