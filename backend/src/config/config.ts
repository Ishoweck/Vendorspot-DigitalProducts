import dotenv from "dotenv";

dotenv.config();

interface Config {
  // Server Configuration
  nodeEnv: string;
  port: number;
  host: string;

  // Database Configuration
  databaseUrl: string;

  // Redis Configuration
  redisUrl: string;

  // JWT Configuration
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;

  // AWS Configuration
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsRegion: string;
  s3BucketName: string;

  // Paystack Configuration
  paystackSecretKey: string;
  paystackPublicKey: string;

  // Email Configuration
  emailHost: string;
  emailPort: number;
  emailUser: string;
  emailPassword: string;
  emailFrom: string;

  // CORS Configuration
  corsOrigins: string[];

  // File Upload Configuration
  maxFileSize: number;
  allowedFileTypes: string[];

  // Security Configuration
  bcryptRounds: number;
  sessionSecret: string;

  // Rate Limiting
  rateLimitWindowMs: number;
  rateLimitMax: number;

  // Logging
  logLevel: string;
  logFile: string;

  // External Services
  cloudinaryUrl: string;

  // Feature Flags
  enableEmailVerification: boolean;
  enableSmsVerification: boolean;
  enableTwoFactorAuth: boolean;
}

export const config: Config = {
  // Server Configuration
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),
  host: process.env.HOST || "localhost",

  // Database Configuration
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://vendorspot_user:vendorspot_password@localhost:5432/vendorspot",

  // Redis Configuration
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",

  // JWT Configuration
  jwtSecret:
    process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // AWS Configuration
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  awsRegion: process.env.AWS_REGION || "us-east-1",
  s3BucketName: process.env.S3_BUCKET_NAME || "vendorspot-digital-products",

  // Paystack Configuration
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || "",
  paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY || "",

  // Email Configuration
  emailHost: process.env.EMAIL_HOST || "smtp.gmail.com",
  emailPort: parseInt(process.env.EMAIL_PORT || "587", 10),
  emailUser: process.env.EMAIL_USER || "",
  emailPassword: process.env.EMAIL_PASSWORD || "",
  emailFrom: process.env.EMAIL_FROM || "noreply@vendorspot.com",

  // CORS Configuration
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : ["http://localhost:3000", "http://localhost:3001"],

  // File Upload Configuration
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760", 10), // 10MB
  allowedFileTypes: process.env.ALLOWED_FILE_TYPES
    ? process.env.ALLOWED_FILE_TYPES.split(",")
    : [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "pdf",
        "doc",
        "docx",
        "zip",
        "rar",
        "mp4",
        "mp3",
        "wav",
      ],

  // Security Configuration
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "12", 10),
  sessionSecret:
    process.env.SESSION_SECRET ||
    "your-super-secret-session-key-change-in-production",

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),

  // Logging
  logLevel: process.env.LOG_LEVEL || "info",
  logFile: process.env.LOG_FILE || "logs/app.log",

  // External Services
  cloudinaryUrl: process.env.CLOUDINARY_URL || "",

  // Feature Flags
  enableEmailVerification: process.env.ENABLE_EMAIL_VERIFICATION === "true",
  enableSmsVerification: process.env.ENABLE_SMS_VERIFICATION === "true",
  enableTwoFactorAuth: process.env.ENABLE_TWO_FACTOR_AUTH === "true",
};

// Validate required environment variables
const requiredEnvVars = [
  "JWT_SECRET",
  "PAYSTACK_SECRET_KEY",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "S3_BUCKET_NAME",
];

if (config.nodeEnv === "production") {
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

export default config;
