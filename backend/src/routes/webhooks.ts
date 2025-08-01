import { Router } from "express";

const router = Router();

router.post("/paystack", (req, res) => {
  res.json({ message: "Paystack webhook" });
});

export default router;
