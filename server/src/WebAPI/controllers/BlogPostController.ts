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

  public getRouter(): Router {
    return this.router;
  }
}
