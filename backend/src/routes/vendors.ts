import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth";

const router: Router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vendors endpoint - Coming soon",
    data: [],
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vendor details endpoint - Coming soon",
    data: null,
  });
});

router.post("/", authenticate, (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create vendor endpoint - Coming soon",
    data: null,
  });
});

router.put("/:id", authenticate, authorize("VENDOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update vendor endpoint - Coming soon",
    data: null,
  });
});

router.delete("/:id", authenticate, authorize("ADMIN"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete vendor endpoint - Coming soon",
    data: null,
  });
});

export default router;
