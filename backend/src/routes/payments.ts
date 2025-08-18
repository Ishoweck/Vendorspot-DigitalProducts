import { Router } from "express";
import { authenticate, authorize } from "@/middleware/auth";
import {
  initializePayment,
  verifyPayment,
  getUserPayments,
  refundPayment
} from "@/controllers/PaymentController";

const router: Router = Router();

router.post("/initialize", authenticate, initializePayment);
router.get("/verify/:reference", authenticate, verifyPayment);
router.get("/", authenticate, getUserPayments);
router.post("/:id/refund", authenticate, authorize("ADMIN"), refundPayment);

export default router;