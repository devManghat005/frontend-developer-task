import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// @route GET /api/users/me
router.get("/me", protect, async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio
  });
});

// @route PUT /api/users/me
router.put("/me", protect, async (req, res) => {
  const user = req.user;
  const { name, bio } = req.body;

  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;

  await user.save();

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio
  });
});

export default router;
