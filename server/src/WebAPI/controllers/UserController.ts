import { Router, Request, Response } from "express";
import { IUserService } from "../../Domain/services/user/IUserService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";

export class UserController {
  private router: Router;
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.router = Router();
    this.userService = userService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.put("/users/updateUser/:id", authenticate, this.updateUser.bind(this));
    this.router.get("/users/get/:id", authenticate, this.getUserById.bind(this));
  }

  private async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.body;

      const updatedUser = await this.userService.updateUser(user);

      if (updatedUser.userId === 0) {
        res
          .status(400)
          .json({ success: false, message: "Failed to update user." });
      } else {
        res.status(200).json({ success: true, data: updatedUser });
      }
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Server error while updating user." });
    }
  }

  public getRouter(): Router {
    return this.router;
  }

  private async getUserById(req: Request, res: Response): Promise<void> {
    try{
      const userId = parseInt(req.params.id, 10);

      const user = await this.userService.getUserById(userId);

      if(!user.userId) {
        res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json(user);
    } catch(error){
      console.error("Error fetching user:", error);
      res.status(500).json({ success: false, message: "Internal server error"});
    }
  }
}
