import { Request, Response, NextFunction } from "express";
import { User } from "@/models/User";
import { Order } from "@/models/Order";
import { Review } from "@/models/Review";
import { cloudinaryService } from "@/services/cloudinaryService";
import { asyncHandler, createError } from "@/middleware/errorHandler";

export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;

    const userProfile = await User.findById(user._id).select(
      "-password -passwordResetToken -passwordResetExpires -emailVerificationOTP -emailVerificationOTPExpires"
    );

    if (!userProfile) {
      return next(createError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      data: userProfile,
    });
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      country,
      postalCode,
    } = req.body;

    const userProfile = await User.findById(user._id);
    if (!userProfile) {
      return next(createError("User not found", 404));
    }

    if (firstName) userProfile.firstName = firstName;
    if (lastName) userProfile.lastName = lastName;
    if (phone) userProfile.phone = phone;
    if (dateOfBirth) userProfile.dateOfBirth = new Date(dateOfBirth);
    if (gender) userProfile.gender = gender;
    if (address) userProfile.address = address;
    if (city) userProfile.city = city;
    if (state) userProfile.state = state;
    if (country) userProfile.country = country;
    if (postalCode) userProfile.postalCode = postalCode;

    await userProfile.save();

    const updatedUser = await User.findById(user._id).select(
      "-password -passwordResetToken -passwordResetExpires -emailVerificationOTP -emailVerificationOTPExpires"
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  }
);

export const uploadAvatar = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;

    if (!req.file) {
      return next(createError("Please upload an image file", 400));
    }

    const userProfile = await User.findById(user._id);
    if (!userProfile) {
      return next(createError("User not found", 404));
    }

    try {
      const uploadResult = await cloudinaryService.uploadFile(
        req.file,
        "avatars"
      );

      if (userProfile.avatar) {
        cloudinaryService.deleteFile(userProfile.avatar).catch((error) => {
          console.error("Failed to delete old avatar:", error);
        });
      }

      userProfile.avatar = uploadResult.url;
      await userProfile.save();

      res.status(200).json({
        success: true,
        message: "Avatar uploaded successfully",
        data: {
          avatar: uploadResult.url,
        },
      });
    } catch (error) {
      console.error("Avatar upload error:", error);
      return next(createError("Failed to upload avatar", 500));
    }
  }
);

export const changePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(
        createError("Current password and new password are required", 400)
      );
    }

    if (newPassword.length < 6) {
      return next(
        createError("New password must be at least 6 characters", 400)
      );
    }

    const userProfile = await User.findById(user._id);
    if (!userProfile) {
      return next(createError("User not found", 404));
    }

    const isCurrentPasswordValid =
      await userProfile.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return next(createError("Current password is incorrect", 400));
    }

    userProfile.password = newPassword;
    await userProfile.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }
);

export const getUserDashboard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;

    const totalOrders = await Order.countDocuments({ userId: user._id });
    const completedOrders = await Order.countDocuments({
      userId: user._id,
      status: "DELIVERED",
    });
    const pendingOrders = await Order.countDocuments({
      userId: user._id,
      status: { $in: ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED"] },
    });

    const totalSpent = await Order.aggregate([
      { $match: { userId: user._id, paymentStatus: "PAID" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const recentOrders = await Order.find({ userId: user._id })
      .populate({
        path: "items.productId",
        select: "name thumbnail",
      })
      .sort({ createdAt: -1 })
      .limit(5);

    const totalReviews = await Review.countDocuments({ userId: user._id });

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalOrders,
          completedOrders,
          pendingOrders,
          totalSpent: totalSpent[0]?.total || 0,
          totalReviews,
        },
        recentOrders,
      },
    });
  }
);

export const getUserWishlist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    res.status(200).json({
      success: true,
      message: "Wishlist feature coming soon",
      data: [],
    });
  }
);

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const { password } = req.body;

    if (!password) {
      return next(createError("Password is required to delete account", 400));
    }

    const userProfile = await User.findById(user._id);
    if (!userProfile) {
      return next(createError("User not found", 404));
    }

    const isPasswordValid = await userProfile.comparePassword(password);
    if (!isPasswordValid) {
      return next(createError("Password is incorrect", 400));
    }

    const hasActiveOrders = await Order.countDocuments({
      userId: user._id,
      status: { $in: ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED"] },
    });

    if (hasActiveOrders > 0) {
      return next(createError("Cannot delete account with active orders", 400));
    }

    userProfile.status = "INACTIVE";
    userProfile.email = `deleted_${Date.now()}_${userProfile.email}`;
    await userProfile.save();

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  }
);
