import sequelize from "config/config";
import express from "express";
import { propertiesRouter } from "@routes/properties.route";
import cors from "cors";
import path from "path";
import { categoriesRouter } from "@routes/category.route";
import dotenv from "dotenv";
import { contactRouter } from "@routes/contact.route";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use("/api/properties", propertiesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/contacts", contactRouter);
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => {
    console.log("htttp://localhost:3000");
  });
});
