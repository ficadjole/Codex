import { Router, Request, Response } from "express";
import { IBlogPostService } from "../../Domain/services/blogPost/IBlogPostService";
import { UserRole } from "../../Domain/enums/UserRole";
import { BlogPostType } from "../../Domain/enums/BlogPostType";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";

export class BlogPostController {
  private router: Router;
  private blogPostService: IBlogPostService;

  constructor(blogPostService: IBlogPostService) {
    this.router = Router();
    this.blogPostService = blogPostService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/addBlogPost",
      authenticate,
      authorize(UserRole.ADMIN),
      this.addBlogPost.bind(this)
    );

    this.router.put(
      "/updateBlogPost/:blogPostId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.updateBlogPost.bind(this)
    );

    this.router.delete(
      "/deleteBlogPost/:blogPostId",
      authenticate,
      authorize(UserRole.ADMIN),
      this.deleteBlogPost.bind(this)
    );

    this.router.get("/getAllBlogPosts", this.getAllBlogPosts.bind(this));

    this.router.get(
      "/getBlogPostById/:blogPostId",
      this.getBlogPostById.bind(this)
    );

    this.router.get(
      "/getBlogPostsByType/:postType",
      this.getBlogPostsByType.bind(this)
    );
  }

  private async addBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const blogPost = req.body;
      const addedBlogPost = await this.blogPostService.addBlogPost(blogPost);

      if (addedBlogPost.blogPostId === 0) {
        res.status(400).json({
          success: false,
          message: "Failed to add blog post.",
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Blog post added successfully.",
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occurred.",
      });
    }
  }

  private async updateBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const blogPostId = parseInt(req.params.blogPostId);
      const updatedBlogPost = req.body;
      updatedBlogPost.blogPostId = blogPostId;

      const result = await this.blogPostService.updateBlogPost(updatedBlogPost);

      if (result.blogPostId === 0) {
        res.status(400).json({
          success: false,
          message: "Failed to update blog post.",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Blog post updated successfully.",
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

  private async deleteBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const blogPostId = parseInt(req.params.blogPostId);
      const deleted = await this.blogPostService.deleteBlogPost(blogPostId);

      if (deleted) {
        res.status(200).json({
          success: true,
          message: "Blog post deleted successfully.",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to delete blog post.",
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occurred.",
      });
    }
  }

  private async getAllBlogPosts(req: Request, res: Response): Promise<void> {
    try {
      const allPosts = await this.blogPostService.getAllBlogPosts();

      if (allPosts.length > 0) {
        res.status(200).json({
          success: true,
          message: "Successfully fetched all blog posts.",
          data: allPosts,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to fetch blog posts.",
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occurred.",
      });
    }
  }

  private async getBlogPostById(req: Request, res: Response): Promise<void> {
    try {
      const blogPostId = parseInt(req.params.blogPostId);
      const blogPost = await this.blogPostService.getBlogPostById(blogPostId);

      if (blogPost.blogPostId !== 0) {
        res.status(200).json({
          success: true,
          message: "Blog post fetched successfully.",
          data: blogPost,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to fetch blog post.",
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occurred.",
      });
    }
  }

  private async getBlogPostsByType(req: Request, res: Response): Promise<void> {
    try {
      const postType =
        req.params.postType === BlogPostType.announcement.toString()
          ? BlogPostType.announcement
          : BlogPostType.interesting;

      const posts = await this.blogPostService.getBlogPostsByType(postType);

      if (posts.length > 0) {
        res.status(200).json({
          success: true,
          message: `Successfully fetched blog posts of type ${postType}.`,
          data: posts,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to fetch blog posts by type.",
        });
      }
    } catch {
      res.status(500).json({
        success: false,
        message: "Server error occurred.",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
