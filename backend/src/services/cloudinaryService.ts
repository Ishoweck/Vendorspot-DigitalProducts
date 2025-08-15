import { v2 as cloudinary } from "cloudinary";
import { config } from "@/config/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryService = {
  uploadFile: async (
    file: Express.Multer.File,
    folder: string = "products"
  ) => {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `vendorspot/${folder}`,
        resource_type: "auto",
      });
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      throw new Error("File upload failed");
    }
  },

  deleteFile: async (publicId: string) => {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Failed to delete file from Cloudinary:", error);
    }
  },
};
