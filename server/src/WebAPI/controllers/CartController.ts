import { Router, Request, Response } from "express";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { optionalAuth } from "../middlewere/authentification/OptionalAuthMiddleware";
import { ICartService } from "../../Domain/services/cart/ICartService";

export class CartController {
  private router: Router;
  private cartService: ICartService;

  constructor(cartService: ICartService) {
    this.router = Router();
    this.cartService = cartService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/getMyCart", authenticate, this.getMyCart.bind(this));

    this.router.get(
      "/getCartCount",
      authenticate,
      this.getCartCount.bind(this),
    );

    this.router.post("/addToCart", authenticate, this.addToCart.bind(this));

    this.router.put(
      "/updateQuantity",
      authenticate,
      this.updateQuantity.bind(this),
    );

    this.router.delete(
      "/removeItem/:itemId",
      authenticate,
      this.removeItem.bind(this),
    );

    this.router.delete("/clearCart", authenticate, this.clearCart.bind(this));
  }

  private async getMyCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.cartService.getCart(userId);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Server error.",
      });
    }
  }

  private async getCartCount(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const count = await this.cartService.getCartItemCount(userId);

      return res.status(200).json({
        success: true,
        data: { count },
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Server error.",
      });
    }
  }

  private async addToCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { itemId, quantity } = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!itemId) {
        return res.status(400).json({
          success: false,
          message: "itemId is required",
        });
      }

      const result = await this.cartService.addToCart(
        userId,
        itemId,
        quantity ?? 1,
      );

      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Failed to add item to cart.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Item added to cart.",
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Server error.",
      });
    }
  }

  private async updateQuantity(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { itemId, quantity } = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.cartService.updateQuantity(
        userId,
        itemId,
        quantity,
      );

      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Failed to update quantity.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cart updated.",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error.",
      });
    }
  }

  private async removeItem(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const itemId = parseInt(req.params.itemId);

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (isNaN(itemId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid itemId.",
        });
      }

      const result = await this.cartService.removeFromCart(userId, itemId);

      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Failed to remove item.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Item removed from cart.",
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Server error.",
      });
    }
  }

  private async clearCart(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const result = await this.cartService.clearCart(userId);

      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Failed to clear cart.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cart cleared.",
      });
    } catch {
      return res.status(500).json({
        success: false,
        message: "Server error.",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
