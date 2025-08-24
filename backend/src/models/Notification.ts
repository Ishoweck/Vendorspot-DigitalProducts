import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type:
    | "ORDER_CREATED"
    | "ORDER_CONFIRMED"
    | "ORDER_SHIPPED"
    | "ORDER_DELIVERED"
    | "PAYMENT_SUCCESS"
    | "PAYMENT_FAILED"
    | "PRODUCT_APPROVED"
    | "PRODUCT_REJECTED"
    | "REVIEW_ADDED"
    | "VENDOR_APPROVED"
    | "SYSTEM_ANNOUNCEMENT"
    | "PROMOTION"
    | "WELCOME"
    | "PROFILE_UPDATED"
    | "PASSWORD_CHANGED";
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  category:
    | "ORDER"
    | "PAYMENT"
    | "PRODUCT"
    | "REVIEW"
    | "ACCOUNT"
    | "SYSTEM"
    | "PROMOTION";
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  channels: ("EMAIL" | "IN_APP" | "PUSH" | "SMS")[];
  emailSent?: boolean;
  pushSent?: boolean;
  smsSent?: boolean;
  readAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "ORDER_CREATED",
        "ORDER_CONFIRMED",
        "ORDER_SHIPPED",
        "ORDER_DELIVERED",
        "PAYMENT_SUCCESS",
        "PAYMENT_FAILED",
        "PRODUCT_APPROVED",
        "PRODUCT_REJECTED",
        "REVIEW_ADDED",
        "VENDOR_APPROVED",
        "SYSTEM_ANNOUNCEMENT",
        "PROMOTION",
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    data: Schema.Types.Mixed,
    isRead: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: [
        "ORDER",
        "PAYMENT",
        "PRODUCT",
        "REVIEW",
        "ACCOUNT",
        "SYSTEM",
        "PROMOTION",
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "NORMAL", "HIGH", "URGENT"],
      default: "NORMAL",
    },
    channels: [
      {
        type: String,
        enum: ["EMAIL", "IN_APP", "PUSH", "SMS"],
      },
    ],
    emailSent: {
      type: Boolean,
      default: false,
    },
    pushSent: {
      type: Boolean,
      default: false,
    },
    smsSent: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    expiresAt: Date,
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ userId: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ category: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ priority: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);
