import { Router, Request, Response } from "express";
import { IGenreService } from "../../Domain/services/genre/IGenreService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { UserRole } from "../../Domain/enums/UserRole";
import { Genre } from "../../Domain/models/Genre";

export class GenreController {
  private router: Router;
  private genreService: IGenreService;

  constructor(genreService: IGenreService) {
    this.router = Router();
    this.genreService = genreService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/addGenre",
      authenticate,
      authorize(UserRole.ADMIN),
      this.addGenre.bind(this),
    );
    this.router.get("/:genreId", this.getGenreById.bind(this));
    this.router.get(
      "/genre-by-name/:genreName",
      this.getGenreByName.bind(this),
    );
    this.router.get("", this.getAllGenres.bind(this));

    this.router.delete(
      "/:genreId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.deleteGenre.bind(this),
    );
    this.router.put(
      "/:genreId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.updateGenre.bind(this),
    );
  }

  private async addGenre(req: Request, res: Response): Promise<void> {
    try {
      const name = req.body.name;

      const result = await this.genreService.addGenre(name);

      if (result.genreId === 0) {
        res.status(400).json({
          success: false,
          message: "Failed to create genre.",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Genre created successfully",
          data: result,
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occurred.",
      });
    }
  }

  private async getGenreById(req: Request, res: Response): Promise<void> {
    try {
      const genreId = parseInt(req.params.genreId as string, 10);

      if (isNaN(genreId)) {
        res.status(400).json({ message: "The passed genreId is not a number" });
        return;
      }

      const result = await this.genreService.getGenreById(genreId);

      if (result.genreId === 0) {
        res
          .status(404)
          .json({ message: `Genre with passed id ${genreId} is not found` });
      } else {
        res.status(200).json({
          success: true,
          message: "Genre found",
          data: result,
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occured",
      });
    }
  }

  private async getGenreByName(req: Request, res: Response): Promise<void> {
    try {
      const genreName = req.params.genreName as string;

      if (genreName.trim().length === 0)
        res.status(400).json({ success: false, message: "Invalid name input" });

      const result = await this.genreService.getGenreByName(genreName);

      if (result.genreId === 0) {
        res.status(404).json({
          message: `Genre with passed name ${genreName} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Genre found",
          data: result,
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occured",
      });
    }
  }

  private async getAllGenres(req: Request, res: Response): Promise<void> {
    try {
      const allGenres = await this.genreService.getAllGenres();

      if (allGenres.length > 0) {
        res.status(200).json({
          success: true,
          message: "Successfully fetched all genres",
          data: allGenres,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to fetch genres.",
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occured",
      });
    }
  }

  private async deleteGenre(req: Request, res: Response): Promise<void> {
    try {
      const genreId = parseInt(req.params.genreId as string, 10);

      if (isNaN(genreId)) {
        res.status(400).json({
          success: false,
          message: "The passed genreId is not a number",
        });
        return;
      }

      const result = await this.genreService.deleteGenre(genreId);

      if (result) {
        res.status(200).json({
          success: true,
          message: `Successfully deleted genre with genreId: ${genreId}`,
        });
      } else {
        res.status(400).json({
          success: false,
          message: `Faild to delete genre with genreId: ${genreId}.`,
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occured",
      });
    }
  }

  private async updateGenre(req: Request, res: Response): Promise<void> {
    try {
      const genreId = parseInt(req.params.genreId as string, 10);

      if (isNaN(genreId)) {
        res.status(400).json({
          success: false,
          message: "The passed genreId is not a number",
        });
        return;
      }

      const name = req.body.name;

      if (name.trim().length === 0)
        res.status(400).json({ success: false, message: "Invalid name input" });

      const result = await this.genreService.updateGenre(
        new Genre(genreId, name),
      );

      if (result.genreId === 0) {
        res.status(404).json({
          success: false,
          message: `Genre with passed id ${genreId} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Genre with passed id ${genreId} is updated`,
          data: result,
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occured",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
