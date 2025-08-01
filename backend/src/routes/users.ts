import { Router } from "express";

const router = Router();

router.get("/profile", (req, res) => {
  res.json({ message: "Get user profile" });
});

router.put("/profile", (req, res) => {
  res.json({ message: "Update user profile" });
});

export default router;
