import { Request, Response, Router } from "express";
import { IItemImageService } from "../../Domain/services/itemImage/IItemImageService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { ItemImage } from "../../Domain/models/ItemImage";

export class ItemImageController {
  private router: Router;
  private ItemImageService: IItemImageService;

  constructor(ItemImageService: IItemImageService) {
    this.router = Router();
    this.ItemImageService = ItemImageService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/items/:itemId/images",
      authenticate,
      this.addImage.bind(this),
    );

    this.router.delete(
      "/images/:imageId",
      authenticate,
      this.deleteImage.bind(this),
    );

    this.router.get("/items/:itemId/images", this.getImagesForItem.bind(this));

    this.router.get(
      "/items/:itemId/images/primary",
      this.getPrimaryImage.bind(this),
    );

    this.router.put(
      "/items/:itemId/images/:imageId",
      this.setPrimaryImage.bind(this),
    );
  }

  async addImage(req: Request, res: Response): Promise<void> {
    try {
      const itemId = Number(req.params.itemId);
      const { imageUrl, isPrimary, sortOrder } = req.body;

      if (!itemId || !imageUrl) {
        res.status(400).json({
          success: false,
          message: "itemId and imageUrl are required",
        });
        return;
      }

      const image = await this.ItemImageService.addImage(
        itemId,
        imageUrl,
        isPrimary,
        sortOrder,
      );

      res.status(201).json({
        success: true,
        data: image,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to add image",
      });
    }
  }

  async deleteImage(req: Request, res: Response): Promise<void> {
    try {
      const imageId = Number(req.params.imageId);

      if (!imageId) {
        res.status(400).json({
          success: false,
          message: "imageId is required",
        });
        return;
      }

      const deleted = await this.ItemImageService.deleteImage(imageId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: "Image not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Image deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete image",
      });
    }
  }

  async getImagesForItem(req: Request, res: Response): Promise<void> {
    try {
      const itemId = Number(req.params.itemId);

      if (!itemId) {
        res.status(400).json({
          success: false,
          message: "itemId is required",
        });
        return;
      }

      const images = await this.ItemImageService.getImagesForItem(itemId);

      res.status(200).json({
        success: true,
        data: images,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch images",
      });
    }
  }

  async getPrimaryImage(req: Request, res: Response): Promise<void> {
    try {
      const itemId = Number(req.params.itemId);

      if (!itemId) {
        res.status(400).json({
          success: false,
          message: "itemId is required",
        });
        return;
      }

      const image = await this.ItemImageService.getPrimaryImage(itemId);

      if (!image) {
        res.status(404).json({
          success: false,
          message: "Primary image not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: image,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch primary image",
      });
    }
  }

  async setPrimaryImage(req: Request, res: Response): Promise<void> {
    try {
      const itemId = Number(req.params.itemId);
      const imageId = Number(req.params.imageId);
      const { isPrimary } = req.body;

      if (!itemId || !imageId) {
        res.status(400).json({
          success: false,
          message: "itemId and imageId are required",
        });
        return;
      }

      const result = await this.ItemImageService.setPrimaryImage({
        imageId,
        itemId,
        isPrimary,
      });

      if (result) {
        res.status(200).json({
          success: true,
          message: "Succesfully setted primary image",
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          message: "Primary image was not set succesfully",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to set primary image",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
