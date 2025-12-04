import express from "express";
import { validationResult } from "express-validator";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  taskCreateValidation,
  taskUpdateValidation
} from "../validators/taskValidators.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  // Builds the task query based on filters
  const { search, status, priority } = req.query;

  const query = { user: req.user._id };

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post("/", protect, taskCreateValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status, priority } = req.body;

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    status,
    priority
  });

  res.status(201).json(task);
});

router.put("/:id", protect, taskUpdateValidation, async (req, res) => {
  const { id } = req.params;

  // Finds the task that belongs to the current user
  const task = await Task.findOne({ _id: id, user: req.user._id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, status, priority } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;

  await task.save();
  res.json(task);
});

router.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;

  // Deletes the task if it belongs to the user
  const task = await Task.findOne({ _id: id, user: req.user._id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted" });
});

export default router;
