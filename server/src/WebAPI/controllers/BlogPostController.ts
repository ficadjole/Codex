import { Router, Request, Response } from "express";
import { IBlogPostService } from "../../Domain/services/blogPost/IBlogPostService";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";
import { UserRole } from "../../Domain/enums/UserRole";
import { TipBlogPosta } from "../../Domain/enums/TipBlogPosta";

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
      authorize(UserRole.ADMIN),
      this.dodajBlogPost.bind(this)
    );

    this.router.put(
      "/azurirajBlogPost/:blogPostId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.azurirajBlogPost.bind(this)
    );

    this.router.delete(
      "/obrisiBlogPost/:blogPostId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.obrisiBlogPost.bind(this)
    );

    this.router.get("/getAllBlogPosts", this.getAllBlogPostovi.bind(this));

    this.router.get(
      "/getArtikalById/:blogPostId",
      this.getBlogPostById.bind(this)
    );

    this.router.get(
      "/getBlogPostByTip/:tipPosta",
      this.getBlogPostByTip.bind(this)
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

  private async getAllBlogPostovi(req: Request, res: Response): Promise<void> {
    try {
      const sviBlogPostovi = await this.blogPostService.getAllBlogPostovi();

      if (sviBlogPostovi.length > 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste ucitali sve blogove",
          data: sviBlogPostovi,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Dobavljanje svih blog postova nije uspelo",
        });
      }
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Doslo je do greske na serveru." });
    }
  }

  private async getBlogPostById(req: Request, res: Response): Promise<void> {
    try {
      const blog_post_id = parseInt(req.params.blogPostId);

      const blogPost = await this.blogPostService.getBlogPostById(blog_post_id);

      if (blogPost.blog_post_id !== 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste ucitali blog",
          data: blogPost,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Ucitavanje blog posta nije uspelo",
        });
      }
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Doslo je do greske na serveru." });
    }
  }

  private async getBlogPostByTip(req: Request, res: Response): Promise<void> {
    try {
      const tipPosta =
        req.params.tipPosta === TipBlogPosta.obavestenje.toString()
          ? TipBlogPosta.obavestenje
          : TipBlogPosta.zanimljivost;

      const blogPostovi = await this.blogPostService.getBlogPostByTip(tipPosta);

      if (blogPostovi.length > 0) {
        res.status(200).json({
          success: true,
          message: "Uspesno ste ucitali blogove tipa",
          data: blogPostovi,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Dobavljanje svih blog postova nije uspelo",
        });
      }
    } catch {
      res
        .status(500)
        .json({ success: false, message: "Doslo je do greske na serveru" });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
