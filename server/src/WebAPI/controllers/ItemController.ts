import { Router } from "express";
import { IItemService } from "../../Domain/services/item/IItemService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { UserRole } from "../../Domain/enums/UserRole";


export class ItemController {
  private router: Router;
  private service: IItemService;

  constructor(service: IItemService) {
    this.router = Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/addItem", authenticate, authorize(UserRole.ADMIN), this.addItem.bind(this));
    this.router.put("/updateItem/:itemId", authenticate, authorize(UserRole.ADMIN), this.updateItem.bind(this));
    this.router.delete("/deleteItem/:itemId", authenticate, authorize(UserRole.ADMIN), this.deleteItem.bind(this));

    this.router.get("/getItemById/:itemId", authenticate, this.getItemById.bind(this));
    this.router.get("/getAllItems", authenticate, this.getAllItems.bind(this));
    this.router.get("/getItemsByType/:type", authenticate, this.getItemsByType.bind(this));
    this.router.get("/getBook/:itemId", authenticate, this.getBook.bind(this));
    this.router.get("/getAccessory/:itemId", authenticate, this.getAccessory.bind(this));
  }

  private async addItem(req: any, res: any) {
    try {
      const result = await this.service.addItem(req.body);
      if (result.itemId === 0) return res.status(400).json({ success: false, message: "Failed to add item." });
      res.status(201).json({ success: true, message: "Item added successfully." });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async updateItem(req: any, res: any) {
    try {
      const item = req.body;
      item.itemId = parseInt(req.params.itemId);
      const result = await this.service.updateItem(item);
      if (result.itemId === 0) return res.status(400).json({ success: false, message: "Failed to update item." });
      res.status(200).json({ success: true, message: "Item updated successfully." });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async deleteItem(req: any, res: any) {
    try {
      const itemId = parseInt(req.params.itemId);
      const result = await this.service.deleteItem(itemId);
      if (!result) return res.status(400).json({ success: false, message: "Failed to delete item." });
      res.status(200).json({ success: true, message: "Item deleted successfully." });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getItemById(req: any, res: any) {
    try {
      const itemId = parseInt(req.params.itemId);
      const result = await this.service.getItemById(itemId);
      if (result.itemId === 0) return res.status(404).json({ success: false, message: "Item not found." });
      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getAllItems(req: any, res: any) {
    try {
      const result = await this.service.getAllItems();
      if (result.length === 0) return res.status(404).json({ success: false, message: "No items available." });
      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getItemsByType(req: any, res: any) {
    try {
      const type = req.params.type;
      const result = await this.service.getItemsByType(type);
      if (result.length === 0) return res.status(404).json({ success: false, message: "No items of this type." });
      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getBook(req: any, res: any) {
    try {
      const itemId = parseInt(req.params.itemId);
      const item = await this.service.getItemById(itemId);
      const book = await this.service.getBook(itemId);

      book.name = item.name;
      book.price = item.price;
      book.imageUrl = item.imageUrl;

      if (book.itemId === 0 || item.itemId === 0) return res.status(404).json({ success: false, message: "Book not found." });
      res.status(200).json({ success: true, data: book });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getAccessory(req: any, res: any) {
    try {
      const itemId = parseInt(req.params.itemId);
      const item = await this.service.getItemById(itemId);
      const accessory = await this.service.getAccessory(itemId);

      accessory.name = item.name;
      accessory.price = item.price;
      accessory.imageUrl = item.imageUrl;

      if (accessory.itemId === 0 || item.itemId === 0) return res.status(404).json({ success: false, message: "Accessory not found." });
      res.status(200).json({ success: true, data: accessory });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
