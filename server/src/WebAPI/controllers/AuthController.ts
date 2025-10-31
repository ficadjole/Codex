import { Router, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import { validacijaPodatakaAuthLogin } from "../validators/auth/validacijaPodatakaAuthLogin";
import { validacijaPodatakaAuth } from "../validators/auth/validacijaPodatakaAuthRegister";

export class AuthController {
  private router: Router;
  private authService: IAuthService;

  constructor(authService: IAuthService) {
    this.router = Router();
    this.authService = authService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/auth/prijava", this.prijava.bind(this));
    this.router.post("/auth/registracija", this.registracija.bind(this));
  }

  private async prijava(req: Request, res: Response): Promise<void> {
    try {
      const { korisnicko_ime, password } = req.body;

      const rezultat = validacijaPodatakaAuthLogin(korisnicko_ime, password);

      if (!rezultat.uspesno) {
        res.status(400).json({ succes: false, message: rezultat.poruka });
        return;
      }

      const result = await this.authService.prijava(korisnicko_ime, password);

      if (result.korisnik_id !== 0) {
        //kreiranje tokena za autorizaciju korisnika
        const token = jwt.sign(
          {
            id: result.korisnik_id,
            username: result.korisnicko_ime,
            email: result.email,
            uloga: result.uloga,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res
          .status(200)
          .json({ success: true, message: "Uspesna prijava", data: token });
        return;
      } else {
        res.status(401).json({
          success: false,
          message: "Neispravno unoseni podaci",
          data: result,
        });
        return;
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async registracija(req: Request, res: Response): Promise<void> {
    try {
      const { ime, prezime, email, korisnicko_ime, lozinka, uloga } = req.body;

      const rezultat = validacijaPodatakaAuth(
        ime,
        prezime,
        korisnicko_ime,
        email,
        lozinka,
        uloga
      );

      if (!rezultat.uspesno) {
        res.status(400).json({ succes: false, message: rezultat.poruka });
        return;
      }

      const result = await this.authService.registracija(
        ime,
        prezime,
        email,
        korisnicko_ime,
        lozinka,
        uloga
      );

      if (result.korisnik_id !== 0) {
        const token = jwt.sign(
          {
            id: result.korisnik_id,
            username: result.korisnicko_ime,
            email: result.email,
            uloga: result.uloga,
          },
          process.env.JWT_SECRET ?? "",
          { expiresIn: "6h" }
        );

        res.status(200).json({
          success: true,
          message: "Uspesna registracija",
          data: token,
        });
        return;
      } else {
        res.status(401).json({
          success: false,
          message: "Registracija nije uspela. Korisnicko ime vec postoji",
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
