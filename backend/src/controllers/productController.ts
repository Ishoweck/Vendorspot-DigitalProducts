import { Request, Response, NextFunction } from "express";
import { Product } from "@/models/Product";
import { Vendor } from "@/models/Vendor";
import { cloudinaryService } from "@/services/cloudinaryService";
import { asyncHandler, createError } from "@/middleware/errorHandler";
import { SocketService } from "@/services/SocketService";

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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

      if (req.query.vendor) {
        const vendors = await Vendor.find({
          businessName: { $regex: req.query.vendor, $options: "i" },
        });
        if (vendors.length > 0) {
          query.vendorId = { $in: vendors.map((v) => v._id) };
        } else {
          return res.status(200).json({
            success: true,
            data: [],
            pagination: {
              total: 0,
              page,
              limit,
              totalPages: 0,
            },
          });
        }
      }

      if (req.query.minPrice || req.query.maxPrice) {
        query.price = {};
        if (req.query.minPrice) {
          query.price.$gte = parseFloat(req.query.minPrice as string);
        }
        if (req.query.maxPrice) {
          query.price.$lte = parseFloat(req.query.maxPrice as string);
        }
      }

      if (req.query.minRating) {
        query.rating = { $gte: parseFloat(req.query.minRating as string) };
      }

      let sortOptions: any = { createdAt: -1 };
      if (req.query.sortBy) {
        const sortBy = req.query.sortBy as string;
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

        if (sortBy === "price") {
          sortOptions = { price: sortOrder };
        } else if (sortBy === "rating") {
          sortOptions = { rating: sortOrder };
        } else if (sortBy === "soldCount") {
          sortOptions = { soldCount: sortOrder };
        } else if (sortBy === "createdAt") {
          sortOptions = { createdAt: sortOrder };
        }
      }

      const products = await Product.find(query)
        .populate("vendorId", "businessName")
        .populate("categoryId", "name")
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);

      const total = await Product.countDocuments(query);

      return res.status(200).json({
        success: true,
        data: products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return next(error);
    }
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

    await Product.findByIdAndUpdate(req.params.id, {
      $inc: { viewCount: 1 }
    });

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

    const {
      name,
      description,
      price,
      originalPrice,
      discountPercentage,
      categoryId,
      tags,
      features,
      requirements,
      instructions,
      licenseType,
      licenseDuration,
      downloadLimit,
    } = req.body;

    if (!name || !description || !price || !categoryId) {
      return next(createError("All required fields must be provided", 400));
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let fileUrl = "";
    let thumbnail = "";
    let previewUrl = "";
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

      if (files.preview && files.preview[0]) {
        const previewUpload = await cloudinaryService.uploadFile(
          files.preview[0],
          "products/previews"
        );
        previewUrl = previewUpload.url;
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
      slug,
      description,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      discountPercentage: discountPercentage
        ? parseFloat(discountPercentage)
        : undefined,
      isDigital: true,
      fileUrl,
      thumbnail,
      previewUrl,
      images,
      tags: tags ? JSON.parse(tags) : [],
      features: features ? JSON.parse(features) : [],
      requirements,
      instructions,
      licenseType,
      licenseDuration: licenseDuration ? parseInt(licenseDuration) : undefined,
      downloadLimit: downloadLimit ? parseInt(downloadLimit) : -1,
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

    const {
      name,
      description,
      price,
      originalPrice,
      discountPercentage,
      categoryId,
      tags,
      features,
      requirements,
      instructions,
      licenseType,
      licenseDuration,
      downloadLimit,
    } = req.body;

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

      if (files.preview && files.preview[0]) {
        const previewUpload = await cloudinaryService.uploadFile(
          files.preview[0],
          "products/previews"
        );
        product.previewUrl = previewUpload.url;
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

    if (name) {
      product.name = name;
      product.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (description) product.description = description;
    if (price) product.price = parseFloat(price);
    if (originalPrice !== undefined)
      product.originalPrice = originalPrice
        ? parseFloat(originalPrice)
        : undefined;
    if (discountPercentage !== undefined)
      product.discountPercentage = discountPercentage
        ? parseFloat(discountPercentage)
        : undefined;
    if (categoryId) product.categoryId = categoryId;
    if (tags) product.tags = JSON.parse(tags);
    if (features) product.features = JSON.parse(features);
    if (requirements !== undefined) product.requirements = requirements;
    if (instructions !== undefined) product.instructions = instructions;
    if (licenseType) product.licenseType = licenseType;
    if (licenseDuration !== undefined)
      product.licenseDuration = licenseDuration
        ? parseInt(licenseDuration)
        : undefined;
    if (downloadLimit !== undefined)
      product.downloadLimit = downloadLimit ? parseInt(downloadLimit) : -1;

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

    const urlsToDelete: string[] = [];

    if (product.fileUrl) {
      urlsToDelete.push(product.fileUrl);
    }

    if (product.thumbnail) {
      urlsToDelete.push(product.thumbnail);
    }

    if (product.images && product.images.length > 0) {
      urlsToDelete.push(...product.images);
    }

    await Product.findByIdAndDelete(req.params.id);

    if (urlsToDelete.length > 0) {
      cloudinaryService.deleteMultipleFiles(urlsToDelete).catch((error) => {
        console.error("Failed to delete files from Cloudinary:", error);
      });
    }

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
