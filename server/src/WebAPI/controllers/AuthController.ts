import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import { validateAuthDataLogin } from "../validators/auth/validateAuthDataLogin";
import { validateAuthDataRegistraion } from "../validators/auth/validateAuthDataRegistraion";

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/auth/login", this.login.bind(this));
    this.router.post("/auth/registration", this.registration.bind(this));
  }

  private async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;

      const validationResult = validateAuthDataLogin(username, password);

      if (!validationResult.success) {
        res
          .status(400)
          .json({ succes: false, message: validationResult.message });
        return;
      }

      const result = await this.authService.login(username, password);

      if (result.userId !== 0) {
        //kreiranje tokena za autorizaciju korisnika
        const token = jwt.sign(
          {
            id: result.userId,
            username: result.username,
            email: result.email,
            userRole: result.userRole,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res
          .status(200)
          .json({ success: true, message: "Login successful", data: token });
        return;
      } else {
        res.status(401).json({
          success: false,
          message: "Incorrectly entered data",
          data: result,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async registration(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, username, password, userRole } =
        req.body;

      const validationResult = validateAuthDataRegistraion(
        firstName,
        lastName,
        username,
        email,
        password,
        userRole
      );
      if (validationResult.success === false) {
        res
          .status(400)
          .json({ succes: false, message: validationResult.message });
        return;
      }

      const result = await this.authService.registration(
        firstName,
        lastName,
        email,
        username,
        password,
        userRole
      );

      if (result.userId !== 0) {
        const token = jwt.sign(
          {
            id: result.userId,
            username: result.username,
            email: result.email,
            userRole: result.userRole,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res.status(200).json({
          success: true,
          message: "Successful registration",
          data: token,
        });
        return;
      } else {
        res.status(401).json({
          success: false,
          message:
            "Registration failed. The username or email has already been used",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}