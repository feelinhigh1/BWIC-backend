import express from "express";
import ContactController from "@controller/contact.controller";

const router = express.Router();

router.post(
  "/",
  ContactController.submitContactMessage.bind(ContactController)
);

export { router as contactRouter };
