import { Router, Response, Request } from "express";
import { IKomentarService } from "../../Domain/services/komentar/IKomentarService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { Uloga } from "../../Domain/enums/Uloga";

export class KomentarController {
  private router: Router;
  private komentarService: IKomentarService;

  constructor(komentarService: IKomentarService) {
    this.router = Router();
    this.komentarService = komentarService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/dodajKomentar",
      authenticate,
      this.dodajKomentar.bind(this)
    );

    this.router.delete(
      "/:komentarId",
      authenticate,
      authorize(Uloga.admin),
      this.obrisiKomentar.bind(this)
    );

    this.router.get(
      "/prikaziSveKomentare/:blogPostId",
      authenticate,
      this.prikaziSveKomentare.bind(this)
    );
  }

  private async dodajKomentar(req: Request, res: Response): Promise<void> {
    try {
      const noviKomentar = req.body;

      const result = await this.komentarService.dodajKomentar(noviKomentar);

      if (result.komentar_id !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste dodali komentar!",
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Neuspesno dodavanje komentar",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async obrisiKomentar(req: Request, res: Response): Promise<void> {
    try {
      const komentar_id = parseInt(req.params.komentarId);

      const result = await this.komentarService.obrisiKomentar(komentar_id);

      if (result.komentar_id !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste obrisali komentar!",
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Neuspesno brisanje komentar",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async prikaziSveKomentare(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const blog_post_id = parseInt(req.params.blogPostId);
      const sviKomentari =
        await this.komentarService.prikaziSveKomentareZaBlogPost(blog_post_id);

      if (sviKomentari.length > 0 && sviKomentari[0].komentar_id !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste ispisali sve komentare!",
          data: sviKomentari,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Neuspesno izlistavanje komentara",
          data: sviKomentari,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
