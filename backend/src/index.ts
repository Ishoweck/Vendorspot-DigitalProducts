import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { config } from "./config/config";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
// import productRoutes from "./routes/products";
// import categoryRoutes from "./routes/categories";
import adminRoutes from "./routes/admin";

import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";

import { logger } from "./services/logger";
import { SocketService } from "@/services/SocketService";

// Load environment variables
dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeServices();
  }

  private async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(config.mongodbUri);
      console.log("✅ MongoDB connected successfully");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
      process.exit(1);
    }
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());

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
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many requests from this IP, please try again later.",
      standardHeaders: true,
      legacyHeaders: false,
    });

    this.app.use("/api/", limiter);

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Compression
    this.app.use(compression());

    // Logging
    if (config.nodeEnv !== "test") {
      this.app.use(
        morgan("combined", {
          stream: {
            write: (message: string) => logger.info(message.trim()),
          },
        })
      );
    }

    // Trust proxy for Render deployment
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

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

    private async initializeServices(): Promise<void> {
    try {

      // Initialize Socket.IO
      SocketService.initialize(this.io);
      logger.info("Socket.IO initialized successfully");
    } catch (error) {
      logger.error("Failed to initialize services:", error);
      process.exit(1);
    }
  }

  public start(): void {
    const port = config.port;

    this.app.listen(port, () => {
      console.log(
        `🚀 Server running on port ${port} in ${config.nodeEnv} mode`
      );
      console.log(`🏥 Health Check: http://localhost:${port}/health`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully");
      mongoose.connection.close(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received, shutting down gracefully");
      mongoose.connection.close(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });
  }
}

// Start the application
const app = new App();
app.start();

export default app;
