import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { config } from "../config/config";
import { createError, asyncHandler } from "./errorHandler";

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Verify JWT token
export const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // Check for token in header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(createError("Access denied. No token provided", 401));
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret) as any;

      // Get user from database
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return next(createError("User not found", 401));
      }

      if (user.status !== "ACTIVE") {
        return next(createError("Account is not active", 401));
      }

      req.user = user;
      next();
    } catch (error) {
      return next(createError("Invalid token", 401));
    }
  }
);

// Check user roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError("Access denied. Please login", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(createError("Access denied. Insufficient permissions", 403));
    }

    next();
  };
};

// Check if user is vendor
export const isVendor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError("Access denied. Please login", 401));
    }

    if (req.user.role !== "VENDOR" && req.user.role !== "ADMIN") {
      return next(createError("Access denied. Vendor access required", 403));
    }

    next();
  }
);

// Check if user is admin
export const isAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError("Access denied. Please login", 401));
    }

    if (req.user.role !== "ADMIN") {
      return next(createError("Access denied. Admin access required", 403));
    }

    next();
  }
);

// Optional authentication (doesn't throw error if no token)
export const optionalAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret) as any;
        const user = await User.findById(decoded.id).select("-password");

        if (user && user.status === "ACTIVE") {
          req.user = user;
        }
      } catch (error) {
        // Ignore token errors for optional auth
      }
    }

    next();
  }
);
