import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth";

const router = Router();

router.use(authenticate);
router.use(authorize("ADMIN"));

router.get("/dashboard", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin dashboard data retrieved successfully",
    data: {
      totalUsers: 0,
      totalVendors: 0,
      totalProducts: 0,
      totalOrders: 0,
      recentActivity: [],
    },
  });
});

router.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  });
});

router.get("/vendors", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vendors retrieved successfully",
    data: [],
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  });
});

export default router;
