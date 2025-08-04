import { Request, Response } from "express";
import { ContactMessage } from "../models/contact.model";
import nodemailer from "nodemailer";

interface IContactMessage {
  name: string;
  email: string;
  phone?: string;
  investmentRange: string;
  propertyType: string;
  message?: string;
}

export class ContactController {
  // Create / Submit contact message
  async submitContactMessage(req: Request, res: Response) {
    try {
      const request: IContactMessage = req.body;

      // Validate required fields
      if (
        !request.name ||
        !request.email ||
        !request.investmentRange ||
        !request.propertyType
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Save contact message to DB
      const contactMessage = new ContactMessage();
      contactMessage.name = request.name;
      contactMessage.email = request.email;
      contactMessage.phone = request.phone;
      contactMessage.investmentRange = request.investmentRange;
      contactMessage.propertyType = request.propertyType;
      contactMessage.message = request.message;

      await contactMessage.save();

      // Create nodemailer transporter using SMTP config from .env
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Prepare email content
      const mailOptions = {
        from: `"Your Website" <${process.env.FROM_EMAIL}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `New Contact Message from ${contactMessage.name}`,
        text: `
      You have a new contact message:

      Name: ${contactMessage.name}
      Email: ${contactMessage.email}
      Phone: ${contactMessage.phone ?? "N/A"}
      Investment Range: ${contactMessage.investmentRange}
      Property Type: ${contactMessage.propertyType}
      Message: ${contactMessage.message ?? "N/A"}
              `,
      };

      // Send notification email
      await transporter.sendMail(mailOptions);

      return res.status(201).json({
        message: "Contact message received and notification email sent",
        data: contactMessage,
      });
    } catch (error) {
      console.error("Error saving contact message or sending email:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new ContactController();
