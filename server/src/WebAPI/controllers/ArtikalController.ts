import { Router } from "express";
import { IArtikalService } from "../../Domain/services/artikal/IArtikalService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { Uloga } from "../../Domain/enums/Uloga";

export class ArtikalController {
  private router: Router;
  private artikalService: IArtikalService;

  public constructor(artikalService: IArtikalService) {
    this.router = Router();
    this.artikalService = artikalService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //definisanje ruta

    this.router.post(
      "/dodajArtikal",
      authenticate,
      authorize(Uloga.admin),
      this.dodajArtikal.bind(this)
    );
  }

  private async dodajArtikal(req: any, res: any): Promise<void> {
    try {
      const artikal = req.body;

      const rezultat = await this.artikalService.dodajArtikal(artikal);

      if (rezultat.artikal_id === 0) {
        res
          .status(400)
          .json({ success: false, message: "Dodavanje artikla nije uspelo." });
        return;
      } else {
        res
          .status(201)
          .json({ success: true, message: "Artikal je uspesno dodat." });
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
