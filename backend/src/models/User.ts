import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  password: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER";
  address?: string;
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  role: "CUSTOMER" | "VENDOR" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BANNED";
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationOTP?: string;
  emailVerificationOTPExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    address: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: "Nigeria",
    },
    postalCode: String,
    role: {
      type: String,
      enum: ["CUSTOMER", "VENDOR", "ADMIN", "MODERATOR"],
      default: "CUSTOMER",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED", "BANNED"],
      default: "ACTIVE",
    },
    lastLoginAt: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockedUntil: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationOTP: String,
    emailVerificationOTPExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
