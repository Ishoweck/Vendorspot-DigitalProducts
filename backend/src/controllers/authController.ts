import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "@/models/User";
import { config } from "@/config/config";
import { emailService } from "@/services/emailService";
import { logger } from "@/utils/logger";
import { asyncHandler, createError } from "@/middleware/errorHandler";

const generateTokens = (userId: string) => {
  const signOptions: jwt.SignOptions = {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    algorithm: "HS256",
  };

  const refreshSignOptions: jwt.SignOptions = {
    expiresIn: config.jwtRefreshExpiresIn as jwt.SignOptions["expiresIn"],
    algorithm: "HS256",
  };

  const token = jwt.sign(
    { id: userId },
    Buffer.from(config.jwtSecret),
    signOptions
  );

  const refreshToken = jwt.sign(
    { id: userId },
    Buffer.from(config.jwtSecret),
    refreshSignOptions
  );

  return { token, refreshToken };
};

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, firstName, lastName, phone, isVendor } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return next(createError("All required fields must be provided", 400));
    }

    if (password.length < 6) {
      return next(createError("Password must be at least 6 characters", 400));
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return next(createError("User with this email already exists", 409));
    }

    const role = isVendor ? "VENDOR" : "CUSTOMER";

    const user = await User.create({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      phone,
      role,
    });

    const { token, refreshToken } = generateTokens(String(user._id));

    try {
      await emailService.sendWelcomeEmail(user.email, user.firstName);
      logger.info(`Welcome email sent to ${user.email}`, {
        userId: String(user._id),
        email: user.email,
      });
    } catch (error) {
      logger.error(`Failed to send welcome email to ${user.email}:`, {
        error: error instanceof Error ? error.message : String(error),
        userId: String(user._id),
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpiry;
    await user.save();

    try {
      await emailService.sendVerificationEmail(
        user.email,
        user.firstName,
        verificationToken
      );
      logger.info(`Email verification sent to ${user.email}`, {
        userId: String(user._id),
        email: user.email,
        verificationToken,
      });
    } catch (error) {
      logger.error(`Failed to send verification email to ${user.email}:`, {
        error: error instanceof Error ? error.message : String(error),
        userId: String(user._id),
      });
    }

    const userResponse = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: userResponse,
        token,
        refreshToken,
      },
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError("Email and password are required", 400));
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return next(createError("Invalid email or password", 401));
    }

    if (user.status !== "ACTIVE") {
      return next(createError("Account is not active", 401));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
      }
      await user.save();
      return next(createError("Invalid email or password", 401));
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return next(
        createError("Account is temporarily locked. Try again later", 423)
      );
    }

    user.loginAttempts = 0;
    user.lockedUntil = undefined;
    user.lastLoginAt = new Date();
    await user.save();

    const { token, refreshToken } = generateTokens(String(user._id));

    const userResponse = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      country: user.country,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token,
        refreshToken,
      },
    });
  }
);

export const logout = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(createError("Refresh token is required", 400));
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        config.jwtSecret as string
      ) as any;
      const user = await User.findById(decoded.id);

      if (!user || user.status !== "ACTIVE") {
        return next(createError("Invalid refresh token", 401));
      }

      const { token: newToken, refreshToken: newRefreshToken } = generateTokens(
        String(user._id)
      );

      res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          token: newToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      return next(createError("Invalid refresh token", 401));
    }
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return next(createError("Email is required", 400));
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent",
    });

    if (!user) {
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetTokenExpiry;
    await user.save();

    try {
      await emailService.sendPasswordResetEmail(
        user.email,
        user.firstName,
        resetToken
      );
      logger.info(`Password reset email sent to ${user.email}`, {
        userId: String(user._id),
        email: user.email,
        resetToken,
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      logger.error(`Failed to send password reset email to ${user.email}:`, {
        error: error instanceof Error ? error.message : String(error),
        userId: String(user._id),
      });
    }
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, password } = req.body;

    if (!token || !password) {
      return next(createError("Token and password are required", 400));
    }

    if (password.length < 6) {
      return next(createError("Password must be at least 6 characters", 400));
    }

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return next(createError("Invalid or expired reset token", 400));
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.loginAttempts = 0;
    user.lockedUntil = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  }
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    if (!token) {
      return next(createError("Verification token is required", 400));
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return next(createError("Invalid or expired verification token", 400));
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  }
);

export const resendVerification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return next(createError("Email is required", 400));
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return next(createError("User not found", 404));
    }

    if (user.isEmailVerified) {
      return next(createError("Email is already verified", 400));
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpiry;
    await user.save();

    try {
      await emailService.sendVerificationEmail(
        user.email,
        user.firstName,
        verificationToken
      );
    } catch (error) {
      logger.error(`Failed to send verification email to ${user.email}:`, {
        error: error instanceof Error ? error.message : String(error),
        userId: String(user._id),
        reason: "verification_email_failed",
      });
      return next(createError("Failed to send verification email", 500));
    }

    res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });
  }
);
