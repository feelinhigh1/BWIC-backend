import express from "express";
import PropertyController from "@controller/properties.controller";
import { upload } from "@config/multer";

const router = express.Router();

router.get("/", PropertyController.getAll);
router.get("/:id", PropertyController.getById);
// router.post("/", PropertyController.create);
// router.put("/:id", PropertyController.update);
router.delete("/:id", PropertyController.delete);
router.post("/", upload.array("images", 10), PropertyController.create);
router.put("/:id", upload.array("images", 10), PropertyController.update);

export { router as propertiesRouter };
