import { Router } from "express";
import { auth } from "@/middleware/auth";
import { roleAuth } from "@/middleware/roleAuth";

const router = Router();

// TODO: Implement vendor routes
// GET /api/vendors - Get all vendors (public)
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vendors endpoint - Coming soon",
    data: [],
  });
});

// GET /api/vendors/:id - Get vendor by ID (public)
router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vendor details endpoint - Coming soon",
    data: null,
  });
});

// POST /api/vendors - Create vendor (authenticated users)
router.post("/", auth, (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create vendor endpoint - Coming soon",
    data: null,
  });
});

// PUT /api/vendors/:id - Update vendor (vendor owner or admin)
router.put("/:id", auth, roleAuth(["vendor", "admin"]), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update vendor endpoint - Coming soon",
    data: null,
  });
});

// DELETE /api/vendors/:id - Delete vendor (admin only)
router.delete("/:id", auth, roleAuth(["admin"]), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete vendor endpoint - Coming soon",
    data: null,
  });
});

export default router;
