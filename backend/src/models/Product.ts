import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  vendorId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  fileUrl?: string;
  thumbnail?: string;
  images: string[];
  tags: string[];
  isActive: boolean;
  isApproved: boolean;
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  viewCount: number;
  downloadCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    fileUrl: String,
    thumbnail: String,
    images: [String],
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvalStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ vendorId: 1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ isActive: 1, isApproved: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });

export const Product = mongoose.model<IProduct>("Product", productSchema);
