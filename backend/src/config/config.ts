import dotenv from "dotenv";

dotenv.config();

interface Config {
  // Server Configuration
  nodeEnv: string;
  port: number;

  // Database Configuration
  mongodbUri: string;

  // JWT Configuration
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshExpiresIn: string;

  // Paystack Configuration
  paystackSecretKey: string;
  paystackPublicKey: string;

  // Email Configuration (Resend)
  resendApiKey: string;
  emailFrom: string;
  frontendUrl: string;

  // CORS Configuration
  corsOrigins: string[];

  // File Upload Configuration
  maxFileSize: number;
  allowedFileTypes: string[];

  // Security Configuration
  bcryptRounds: number;

  // External Services
  cloudinaryUrl: string;

  // Logging
  logLevel: string;
}

export const config: Config = {
  // Server Configuration
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),

  // Database Configuration
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/vendorspot",

  // JWT Configuration
  jwtSecret:
    process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // Paystack Configuration
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY || "",
  paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY || "",

  // Email Configuration (Resend)
  resendApiKey: process.env.RESEND_API_KEY || "",
  emailFrom: process.env.EMAIL_FROM || "noreply@vendorspot.com",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  // CORS Configuration
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : ["http://localhost:3000", "https://your-frontend-domain.vercel.app"],

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

  // External Services
  cloudinaryUrl: process.env.CLOUDINARY_URL || "",

  // Logging
  logLevel: process.env.LOG_LEVEL || "info",
};

// Validate required environment variables
const requiredEnvVars = ["JWT_SECRET", "PAYSTACK_SECRET_KEY"];

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
