import { Router } from "express";

const router = Router();

router.post("/initialize", (req, res) => {
  res.json({ message: "Initialize payment" });
});

router.post("/verify", (req, res) => {
  res.json({ message: "Verify payment" });
});

export default router;
