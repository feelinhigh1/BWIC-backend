import { Sequelize } from "sequelize-typescript";
import { Property } from "@models/properties.model";
import { Category } from "@models/category.model";
import { ContactMessage } from "@models/contact.model";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "blue_whale_investment_db",
  logging: true,
  models: [Property, Category, ContactMessage],
});

export default sequelize;
