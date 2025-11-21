import { Router, Request, Response } from "express";
import { IBlogPostService } from "../../Domain/services/blogPost/IBlogPostService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { Uloga } from "../../Domain/enums/Uloga";

export class BlogPostController {
  private router: Router;
  private blogPostService: IBlogPostService;

  public constructor(blogPostService: IBlogPostService) {
    this.router = Router();
    this.blogPostService = blogPostService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/dodajBlogPost",
      authenticate,
      authorize(Uloga.admin),
      this.dodajBlogPost.bind(this)
    );

    this.router.put(
      "/azurirajBlogPost/:blogPostId",
      authenticate,
      authorize(Uloga.admin),
      this.azurirajBlogPost.bind(this)
    );

    this.router.delete(
      "/obrisiBlogPost/:blogPostId",
      authenticate,
      authorize(Uloga.admin),
      this.obrisiBlogPost.bind(this)
    );
  }

  private async dodajBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const blogPost = req.body;

      const dodatBlogPost = await this.blogPostService.dodajBlogPost(blogPost);

      if (dodatBlogPost.blog_post_id === 0) {
        res.status(400).json({
          success: false,
          message: "Dodavanje blog posta nije uspelo.",
        });
      } else {
        res
          .status(201)
          .json({ success: true, message: "Blog post je uspesno dodat." });
      }
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Doslo je do greske na serveru." });
    }
  }

  private async azurirajBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const blog_post_id = parseInt(req.params.blogPostId);

      const noviBlogPost = req.body;

      noviBlogPost.blog_post_id = blog_post_id;

      const azuriranBlogPost = await this.blogPostService.izmeniBlogPost(
        noviBlogPost
      );

      if (azuriranBlogPost.blog_post_id === 0) {
        res.status(400).json({
          success: false,
          message: "Azuriranje blog posta nije uspelo.",
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Blog post je uspesno azuriran.",
          data: azuriranBlogPost,
        });
      }
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Doslo je do greske na serveru." });
    }
  }

  private async obrisiBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const blog_post_id = parseInt(req.params.blogPostId);

      const obrisan = await this.blogPostService.obrisiBlogPost(blog_post_id);

      if (obrisan) {
        res.status(200).json({
          success: true,
          message: "Blog post je uspesno obrisan.",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Brisanje blog posta nije uspelo.",
        });
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
