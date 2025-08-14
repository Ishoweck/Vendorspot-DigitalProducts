import { Router } from "express";
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
} from "@/controllers/authController";
import { authenticate } from "@/middleware/auth";
import { validate } from "@/middleware/validate";

const router = Router();

// Validation middleware
const registerValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),
  body("lastName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Please provide a valid phone number"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const forgotPasswordValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
];

const resetPasswordValidation = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const verifyEmailValidation = [
  body("token").notEmpty().withMessage("Verification token is required"),
];

// Auth routes
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/logout", authenticate, logout);
router.post("/refresh", refreshToken);
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  forgotPassword
);
router.post(
  "/reset-password",
  resetPasswordValidation,
  validate,
  resetPassword
);
router.post("/verify-email", verifyEmailValidation, validate, verifyEmail);
router.post(
  "/resend-verification",
  forgotPasswordValidation,
  validate,
  resendVerification
);

// Get current user (protected route)
router.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: req.user,
  });
});

export default router;
