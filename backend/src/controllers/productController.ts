import { Request, Response, NextFunction } from "express";
import { Product } from "@/models/Product";
import { Vendor } from "@/models/Vendor";
import { cloudinaryService } from "@/services/cloudinaryService";
import { asyncHandler, createError } from "@/middleware/errorHandler";
import { SocketService } from "@/services/SocketService";

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = { isActive: true, isApproved: true };

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ];
    }

    if (req.query.category) {
      query.categoryId = req.query.category;
    }

    const products = await Product.find(query)
      .populate("vendorId", "businessName")
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)
      .populate("vendorId", "businessName")
      .populate("categoryId", "name");

    if (!product) {
      return next(createError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  }
);

export const getVendorProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const vendor = await Vendor.findOne({ userId: user._id });

    if (!vendor) {
      return next(createError("Vendor not found", 404));
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ vendorId: vendor._id })
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({ vendorId: vendor._id });

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const vendor = await Vendor.findOne({ userId: user._id });

    if (!vendor) {
      return next(createError("Vendor not found", 404));
    }

    const { name, description, price, categoryId, tags } = req.body;

    if (!name || !description || !price || !categoryId) {
      return next(createError("All required fields must be provided", 400));
    }

    let fileUrl = "";
    let thumbnail = "";
    const images: string[] = [];

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (files.file && files.file[0]) {
        const fileUpload = await cloudinaryService.uploadFile(
          files.file[0],
          "products/files"
        );
        fileUrl = fileUpload.url;
      }

      if (files.thumbnail && files.thumbnail[0]) {
        const thumbnailUpload = await cloudinaryService.uploadFile(
          files.thumbnail[0],
          "products/thumbnails"
        );
        thumbnail = thumbnailUpload.url;
      }

      if (files.images) {
        for (const image of files.images) {
          const imageUpload = await cloudinaryService.uploadFile(
            image,
            "products/images"
          );
          images.push(imageUpload.url);
        }
      }
    }

    const product = await Product.create({
      vendorId: vendor._id,
      categoryId,
      name,
      description,
      price: parseFloat(price),
      fileUrl,
      thumbnail,
      images,
      tags: tags ? JSON.parse(tags) : [],
    });

    try {
      const io = SocketService.getIO();
      io.emit("product:created", {
        productId: product._id,
        vendorId: vendor._id,
        product: product,
      });
    } catch (error) {
      console.log("Socket emit error:", error);
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const vendor = await Vendor.findOne({ userId: user._id });

    if (!vendor) {
      return next(createError("Vendor not found", 404));
    }

    const product = await Product.findOne({
      _id: req.params.id,
      vendorId: vendor._id,
    });

    if (!product) {
      return next(createError("Product not found", 404));
    }

    const { name, description, price, categoryId, tags } = req.body;

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (files.file && files.file[0]) {
        const fileUpload = await cloudinaryService.uploadFile(
          files.file[0],
          "products/files"
        );
        product.fileUrl = fileUpload.url;
      }

      if (files.thumbnail && files.thumbnail[0]) {
        const thumbnailUpload = await cloudinaryService.uploadFile(
          files.thumbnail[0],
          "products/thumbnails"
        );
        product.thumbnail = thumbnailUpload.url;
      }

      if (files.images) {
        const newImages: string[] = [];
        for (const image of files.images) {
          const imageUpload = await cloudinaryService.uploadFile(
            image,
            "products/images"
          );
          newImages.push(imageUpload.url);
        }
        product.images = newImages;
      }
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = parseFloat(price);
    if (categoryId) product.categoryId = categoryId;
    if (tags) product.tags = JSON.parse(tags);

    await product.save();

    try {
      const io = SocketService.getIO();
      io.emit("product:updated", {
        productId: product._id,
        vendorId: vendor._id,
        product: product,
      });
    } catch (error) {
      console.log("Socket emit error:", error);
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const vendor = await Vendor.findOne({ userId: user._id });

    if (!vendor) {
      return next(createError("Vendor not found", 404));
    }

    const product = await Product.findOne({
      _id: req.params.id,
      vendorId: vendor._id,
    });

    if (!product) {
      return next(createError("Product not found", 404));
    }

    await Product.findByIdAndDelete(req.params.id);

    try {
      const io = SocketService.getIO();
      io.emit("product:deleted", {
        productId: req.params.id,
        vendorId: vendor._id,
      });
    } catch (error) {
      console.log("Socket emit error:", error);
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
);
