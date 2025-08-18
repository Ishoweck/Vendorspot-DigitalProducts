import { Router } from "express";
import multer from "multer";
import { authenticate } from "@/middleware/auth";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
  getUserDashboard,
  getUserWishlist,
  deleteAccount
} from "@/controllers/UserController";

const router: Router = Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.post("/avatar", authenticate, upload.single("avatar"), uploadAvatar);
router.post("/change-password", authenticate, changePassword);
router.get("/dashboard", authenticate, getUserDashboard);
router.get("/wishlist", authenticate, getUserWishlist);
router.delete("/account", authenticate, deleteAccount);

export default router;