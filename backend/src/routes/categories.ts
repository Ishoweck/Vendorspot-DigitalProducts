import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all categories" });
});

export default router;
