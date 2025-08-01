import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  res.json({ message: "Register vendor" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Get vendor ${req.params.id}` });
});

export default router;
