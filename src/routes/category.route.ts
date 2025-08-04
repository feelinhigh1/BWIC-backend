import { Router } from "express";
import CategoryController from "@controller/category.controller";

const router = Router();

// GET /api/categories - Get all categories
router.get("/", CategoryController.getAll);

// GET /api/categories/:id - Get category by ID
router.get("/:id", CategoryController.getById);

// POST /api/categories - Create a new category
router.post("/", CategoryController.create);

// PUT /api/categories/:id - Update category by ID
router.put("/:id", CategoryController.update);

// DELETE /api/categories/:id - Delete category by ID
router.delete("/:id", CategoryController.delete);

export { router as categoriesRouter };
