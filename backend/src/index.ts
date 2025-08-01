import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

import hpp from "hpp";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

// Import configurations
import { config } from "@/config/config";
import { logger } from "@/utils/logger";
import { errorHandler } from "@/middleware/errorHandler";
import { notFoundHandler } from "@/middleware/notFoundHandler";

// Import routes
import authRoutes from "@/routes/auth";
import userRoutes from "@/routes/users";
import productRoutes from "@/routes/products";
import orderRoutes from "@/routes/orders";
import paymentRoutes from "@/routes/payments";
import vendorRoutes from "@/routes/vendors";
import categoryRoutes from "@/routes/categories";
import reviewRoutes from "@/routes/reviews";
import notificationRoutes from "@/routes/notifications";
import adminRoutes from "@/routes/admin";
import webhookRoutes from "@/routes/webhooks";

// Import services
import { DatabaseService } from "@/services/DatabaseService";
import { RedisService } from "@/services/RedisService";
import { SocketService } from "@/services/SocketService";

// Load environment variables
dotenv.config();

class App {
  public app: express.Application;
  public server: any;
  public io: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: config.corsOrigins,
        methods: ["GET", "POST"],
      },
    });

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeServices();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
          },
        },
      })
    );

    // CORS
    this.app.use(
      cors({
        origin: config.corsOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      })
    );

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP, please try again later.",
      standardHeaders: true,
      legacyHeaders: false,
    });

    const speedLimiter = slowDown({
      windowMs: 15 * 60 * 1000, // 15 minutes
      delayAfter: 50, // allow 50 requests per 15 minutes, then...
      delayMs: 500, // begin adding 500ms of delay per request above 50
    });

    this.app.use("/api/", limiter);
    this.app.use("/api/", speedLimiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Compression
    this.app.use(compression());

    // Logging
    this.app.use(
      morgan("combined", {
        stream: {
          write: (message: string) => logger.info(message.trim()),
        },
      })
    );

    // Security middleware
    // XSS protection handled by helmet
    this.app.use(hpp());

    // Trust proxy
    this.app.set("trust proxy", 1);
  }

  private initializeRoutes(): void {
    // Health check
    this.app.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv,
      });
    });

    // API routes
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/orders", orderRoutes);
    this.app.use("/api/payments", paymentRoutes);
    this.app.use("/api/vendors", vendorRoutes);
    this.app.use("/api/categories", categoryRoutes);
    this.app.use("/api/reviews", reviewRoutes);
    this.app.use("/api/notifications", notificationRoutes);
    this.app.use("/api/admin", adminRoutes);
    this.app.use("/api/webhooks", webhookRoutes);

    // Swagger documentation
    if (config.nodeEnv === "development") {
      const swaggerUi = require("swagger-ui-express");
      const swaggerSpec = require("./swagger");
      this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  private async initializeServices(): Promise<void> {
    try {
      // Initialize database
      await DatabaseService.initialize();
      logger.info("Database connected successfully");

      // Initialize Redis
      await RedisService.initialize();
      logger.info("Redis connected successfully");

      // Initialize Socket.IO
      SocketService.initialize(this.io);
      logger.info("Socket.IO initialized successfully");
    } catch (error) {
      logger.error("Failed to initialize services:", error);
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    try {
      const port = config.port;

      this.server.listen(port, () => {
        logger.info(
          `🚀 Server running on port ${port} in ${config.nodeEnv} mode`
        );
        logger.info(`📚 API Documentation: http://localhost:${port}/api-docs`);
        logger.info(`🏥 Health Check: http://localhost:${port}/health`);
      });

      // Graceful shutdown
      process.on("SIGTERM", () => {
        logger.info("SIGTERM received, shutting down gracefully");
        this.server.close(() => {
          logger.info("Process terminated");
          process.exit(0);
        });
      });

      process.on("SIGINT", () => {
        logger.info("SIGINT received, shutting down gracefully");
        this.server.close(() => {
          logger.info("Process terminated");
          process.exit(0);
        });
      });
    } catch (error) {
      logger.error("Failed to start server:", error);
      process.exit(1);
    }
  }
}

// Start the application
const app = new App();
app.start().catch((error) => {
  logger.error("Failed to start application:", error);
  process.exit(1);
});

export default app;
