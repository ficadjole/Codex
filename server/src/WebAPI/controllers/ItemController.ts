import { Router, Request, Response } from "express";
import { IItemService } from "../../Domain/services/item/IItemService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { UserRole } from "../../Domain/enums/UserRole";
import { ItemType } from "../../Domain/enums/ItemType";

export class ItemController {
  private router: Router;
  private itemService: IItemService;

  constructor(itemService: IItemService) {
    this.router = Router();
    this.itemService = itemService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/addItem",
      authenticate,
      authorize(UserRole.ADMIN),
      this.addItem.bind(this),
    );
    this.router.put(
      "/updateItem/:itemId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.updateItem.bind(this),
    );
    this.router.delete(
      "/deleteItem/:itemId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.deleteItem.bind(this),
    );

    this.router.get("/getItemById/:itemId", this.getItemById.bind(this));
    this.router.get("/getAllItems", this.getAllItems.bind(this));
    this.router.get("/getItemsByType/:type", this.getItemsByType.bind(this));
    this.router.get("/getBook/:itemId", this.getBook.bind(this));
    this.router.get("/getAccessory/:itemId", this.getAccessory.bind(this));
    this.router.put(
      "/addDiscount/:itemId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.addDiscount.bind(this),
    );
  }

  private async addItem(req: Request, res: Response): Promise<void> {
    try {
      const item = {
        ...req.body,
        userId: req.user?.id,
      };
      const result = await this.itemService.addItem(item);
      if (result.itemId === 0) {
        if (result.name !== "") {
          res.status(400).json({
            success: false,
            message: "Cannot add item with same name",
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Failed to add item." });
        }
      }

      res.status(201).json({
        success: true,
        message: "Item added successfully.",
        data: result,
      });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const item = req.body;
      item.itemId = parseInt(req.params.itemId as string, 10);
      const result = await this.itemService.updateItem(item);
      if (result.itemId === 0)
        res
          .status(400)
          .json({ success: false, message: "Failed to update item." });
      res
        .status(200)
        .json({ success: true, message: "Item updated successfully." });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const itemId = parseInt(req.params.itemId);
      const result = await this.itemService.deleteItem(itemId);
      if (!result)
        res
          .status(400)
          .json({ success: false, message: "Failed to delete item." });
      res
        .status(200)
        .json({ success: true, message: "Item deleted successfully." });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const itemId = parseInt(req.params.itemId);

      const result = await this.itemService.getItemById(itemId);

      if (result.itemId === 0)
        res.status(404).json({ success: false, message: "Item not found." });

      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getAllItems(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.itemService.getAllItems();

      if (result.length === 0)
        res
          .status(404)
          .json({ success: false, message: "No items available." });

      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getItemsByType(req: Request, res: Response): Promise<void> {
    try {
      const type = req.params.type;
      var itemType: ItemType;
      if (type === "knjiga") {
        itemType = ItemType.BOOK;
      } else if (type === "aksesoar") {
        itemType = ItemType.ACCESSORIES;
      } else {
        res
          .status(404)
          .json({ success: false, message: "Input type is not valid" });
        return;
      }

      const result = await this.itemService.getItemsByType(itemType!);

      if (result.length === 0)
        res
          .status(404)
          .json({ success: false, message: "No items of this type." });

      res.status(200).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getBook(req: Request, res: Response): Promise<void> {
    try {
      const itemId = parseInt(req.params.itemId);
      const item = await this.itemService.getItemById(itemId);

      const book = await this.itemService.getBook(itemId);
      book.name = item.name;
      book.price = item.price;
      book.description = item.description;

      if (book.itemId === 0 || item.itemId === 0)
        res.status(404).json({ success: false, message: "Book not found." });

      res.status(200).json({ success: true, data: book });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async getAccessory(req: Request, res: Response): Promise<void> {
    try {
      const itemId = parseInt(req.params.itemId);

      const item = await this.itemService.getItemById(itemId);

      const accessory = await this.itemService.getAccessory(itemId);

      accessory.name = item.name;
      accessory.price = item.price;
      accessory.description = item.description;

      if (accessory.itemId === 0 || item.itemId === 0)
        res
          .status(404)
          .json({ success: false, message: "Accessory not found." });

      res.status(200).json({ success: true, data: accessory });
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  private async addDiscount(req: Request, res: Response): Promise<void> {
    try {
      const itemId = parseInt(req.params.itemId);
      const { discountPercent, discountFrom, discountTo } = req.body;

      if (isNaN(itemId)) {
        res.status(400).json({ message: "The passed itemId is not a number" });
        return;
      }

      if (isNaN(discountPercent)) {
        res
          .status(400)
          .json({ message: "The passed discountPercent is not a number" });
        return;
      }

      const result = await this.itemService.addDiscount(
        itemId,
        discountPercent,
        discountFrom,
        discountTo,
      );

      if (result) {
        res
          .status(200)
          .json({ success: true, message: "Discount succefuly applied" });
      } else {
        res.status(400).json({
          success: false,
          message: "Adding discount was not succesfull",
        });
      }
    } catch {
      res.status(500).json({ success: false, message: "Server error." });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
