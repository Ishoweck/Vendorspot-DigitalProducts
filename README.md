# Vendorspot Digital Products

Nigeria's most secure online marketplace for digital products. Discover trusted vendors, shop a wide range of digital products, and enjoy instant delivery with secure payment options.

## Features

- **Secure Digital Product Marketplace**: Safe, stress-free buying and selling of digital products
- **Trusted Vendor System**: Verified vendors with reputation scoring
- **Instant Digital Delivery**: Immediate access to purchased digital products
- **Secure Payment Processing**: Multiple payment options with escrow protection
- **User Protection**: Anti-scam measures for both buyers and sellers
- **Real-time Notifications**: Order updates and delivery confirmations

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Redis for caching
- **Authentication**: JWT with refresh tokens
- **File Storage**: AWS S3 for digital products
- **Payment Processing**: Paystack integration
- **Deployment**: AWS EC2 with Docker
- **Monitoring**: AWS CloudWatch

## Project Structure

```
vendorspot-digital-products/
├── frontend/                 # React.js frontend application
├── backend/                  # Node.js/Express.js API server
├── shared/                   # Shared types and utilities
├── infrastructure/           # AWS infrastructure as code
├── docs/                    # Documentation
└── scripts/                 # Deployment and utility scripts
```

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd vendorspot-digital-products

# Install dependencies
npm run install:all

# Start development environment
npm run dev
```

### Production Deployment

```bash
# Deploy to AWS EC2
npm run deploy:production
```

## Environment Variables

Create `.env` files in both `frontend/` and `backend/` directories:

### Backend (.env)

```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/vendorspot
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
PAYSTACK_SECRET_KEY=your-paystack-secret
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=vendorspot-digital-products
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_PAYSTACK_PUBLIC_KEY=your-paystack-public-key
REACT_APP_S3_BUCKET=vendorspot-digital-products
```

## Available Scripts

- `npm run dev` - Start development environment
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run deploy:staging` - Deploy to staging
- `npm run deploy:production` - Deploy to production

## Documentation

- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Database Schema](./docs/database.md)
- [Security Guidelines](./docs/security.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@vendorspot.com or create an issue in this repository.
