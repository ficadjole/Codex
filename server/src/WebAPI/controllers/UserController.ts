import { Router, Request, Response } from "express";
import { IUserService } from "../../Domain/services/user/IUserService";

export class UserController {
  private router: Router;
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.router = Router();
    this.userService = userService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.put("/updateUser", this.updateUser.bind(this));
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
}
