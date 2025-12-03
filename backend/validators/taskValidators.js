import { body } from "express-validator";

export const taskCreateValidation = [
  body("title").notEmpty().withMessage("Title is required")
];

export const taskUpdateValidation = [
  body("title").optional().notEmpty().withMessage("Title cannot be empty")
];
