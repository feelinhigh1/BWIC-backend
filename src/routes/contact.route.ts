import express from "express";
import ContactController from "@controller/contact.controller";

const router = express.Router();

router.get("/", ContactController.getAll);
router.get("/:id", ContactController.getById);
router.post("/", ContactController.submitContactMessage);

export { router as contactRouter };
