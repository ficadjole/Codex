import { Request, Response, Router } from "express";
import { IR2StorageService } from "../../Domain/services/R2/IR2StorageService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { UserRole } from "../../Domain/enums/UserRole";
import { PresingedUrlDto } from "../../Domain/DTOs/r2/PresignedUrlDto";

export class R2Controller {
  private router: Router;
  private R2StorageService: IR2StorageService;

  constructor(R2StorageService: IR2StorageService) {
    this.router = Router();
    this.R2StorageService = R2StorageService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/r2",
      authenticate,
      authorize(UserRole.ADMIN),
      this.getPresignedUrl.bind(this),
    );
  }

  async getPresignedUrl(req: Request, res: Response): Promise<void> {
    try {
      const { itemType, fileName, itemName, contentType } = req.body;

      const dto: PresingedUrlDto = {
        fileName,
        itemName,
        contentType,
        itemType,
      };

      const presignedUrl =
        await this.R2StorageService.generateUrlForUpload(dto);

      res.status(200).json({
        success: true,
        data: presignedUrl,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: "Failed to generate presigned url",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
