import { Router, Request, Response } from "express";
import { IUserService } from "../../Domain/services/user/IUserService";

export class KorisnikController {
  private router: Router;
  private korisnikService: IUserService;

  public constructor(korisnikService: IUserService) {
    this.router = Router();
    this.korisnikService = korisnikService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.put(
      "/azurirajPodatkeKorisnika",
      this.azurirajPodatkeKorisnika.bind(this)
    );
  }

  private async azurirajPodatkeKorisnika(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const korisnik = req.body;

      const azuriraniKorisnik =
        await this.korisnikService.azurirajPodatkeKorisnika(korisnik);

      if (azuriraniKorisnik.korisnik_id === 0) {
        res
          .status(400)
          .json({ success: false, message: "Neuspesna izmena podataka." });
        return;
      } else {
        res.status(200).json({ success: true, data: azuriraniKorisnik });
      }
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Doslo je do greske na serveru." });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
