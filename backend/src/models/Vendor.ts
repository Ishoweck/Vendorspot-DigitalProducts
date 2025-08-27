import mongoose, { Document, Schema } from "mongoose";

export interface IVendor extends Document {
  userId: mongoose.Types.ObjectId;
  businessName: string;
  businessDescription?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  website?: string;
  logo?: string;
  banner?: string;
  taxId?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankAccountName?: string;
  verificationStatus: "NOT_VERIFIED" | "PENDING" | "APPROVED" | "REJECTED";
  verificationDocuments: string[];
  rating: number;
  totalSales: number;
  totalProducts: number;
  commissionRate: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const vendorSchema = new Schema<IVendor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    businessDescription: String,
    businessAddress: String,
    businessPhone: String,
    businessEmail: String,
    website: String,
    logo: String,
    banner: String,
    taxId: String,
    bankName: String,
    bankAccountNumber: String,
    bankAccountName: String,
    verificationStatus: {
      type: String,
      enum: ["NOT_VERIFIED", "PENDING", "APPROVED", "REJECTED"],
      default: "NOT_VERIFIED",
    },
    verificationDocuments: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    totalProducts: {
      type: Number,
      default: 0,
    },
    commissionRate: {
      type: Number,
      default: 0.05, // 5% default commission
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

vendorSchema.index({ verificationStatus: 1 });
vendorSchema.index({ isActive: 1 });

export const Vendor = mongoose.model<IVendor>("Vendor", vendorSchema);
