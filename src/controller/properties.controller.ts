import { Request, Response } from "express";
import { Property } from "@models/properties.model";
import { Category } from "@models/category.model";

interface IPropertyRequest {
  title: string;
  categoryId: number;
  location: string;
  price: string;
  roi: string;
  status: string;
  area: string;
  areaNepali?: string;
  distanceFromHighway?: number;
  images?: string[];
  description: string;
}

export class PropertyController {
  async getAll(req: Request, res: Response) {
    try {
      const properties = await Property.findAll({
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const request = req.body;
      const imageFiles = req.files as Express.Multer.File[];

      if (!imageFiles || imageFiles.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one image is required" });
      }

      const imagePaths = imageFiles.map((file) => `/uploads/${file.filename}`);

      const newProperty = await Property.create({
        title: request.title,
        categoryId: request.categoryId,
        location: request.location,
        price: request.price,
        roi: request.roi,
        status: request.status,
        area: request.area,
        areaNepali: request.areaNepali,
        distanceFromHighway: request.distanceFromHighway,
        images: imagePaths,
        description: request.description,
      });

      res.status(201).json(newProperty);
    } catch (error) {
      res.status(400).json({ message: "Failed to create property", error });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const property = await Property.findByPk(id, {
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: Category,
            attributes: ["name"], // only include category name
          },
        ],
      });

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.status(200).json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const request = req.body;
      const imageFiles = req.files as Express.Multer.File[];

      const property = await Property.findByPk(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      const newImages = imageFiles?.map((file) => `/uploads/${file.filename}`);
      const finalImages = newImages?.length ? newImages : property.images;

      await property.update({
        title: request.title,
        categoryId: request.categoryId,
        location: request.location,
        price: request.price,
        roi: request.roi,
        status: request.status,
        area: request.area,
        areaNepali: request.areaNepali,
        distanceFromHighway: request.distanceFromHighway,
        images: finalImages,
        description: request.description,
      });

      res.status(200).json(property);
    } catch (error) {
      res.status(400).json({ message: "Failed to update property", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const property = await Property.findByPk(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      await property.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Failed to delete property", error });
    }
  }
}

export default new PropertyController();
