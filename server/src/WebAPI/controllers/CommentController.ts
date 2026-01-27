import { Router, Request, Response } from "express";
import { ICommentService } from "../../Domain/services/comment/ICommentService";
import { UserRole } from "../../Domain/enums/UserRole";
import { authenticate } from "../middlewere/authentification/AuthMiddleware";
import { authorize } from "../middlewere/authorization/AuthorizeMiddleware";

export class CommentController {
  private router: Router;

  constructor(private commentService: ICommentService) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/addComment", authenticate, this.addComment.bind(this));
    this.router.delete("/:commentId", authenticate, authorize(UserRole.ADMIN), this.deleteComment.bind(this));
    this.router.get("/all/:blogPostId", authenticate, this.getAllComments.bind(this));
  }

  private async addComment(req: Request, res: Response): Promise<void> {
    try {
      const newComment = req.body;
      const result = await this.commentService.addComment(newComment);

      res.status(result.commentId !== 0 ? 200 : 400).json({
        success: result.commentId !== 0,
        message: result.commentId !== 0 ? "Comment added!" : "Failed to add comment",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const commentId = parseInt(req.params.commentId);
      const result = await this.commentService.deleteComment(commentId);

      res.status(result.commentId !== 0 ? 200 : 400).json({
        success: result.commentId !== 0,
        message: result.commentId !== 0 ? "Comment deleted!" : "Failed to delete comment",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  private async getAllComments(req: Request, res: Response): Promise<void> {
    try {
      const blogPostId = parseInt(req.params.blogPostId);
      const comments = await this.commentService.getCommentsByBlogPost(blogPostId);

      res.status(comments.length > 0 && comments[0].commentId !== 0 ? 200 : 400).json({
        success: comments.length > 0 && comments[0].commentId !== 0,
        message: comments.length > 0 && comments[0].commentId !== 0 ? "Comments retrieved" : "No comments found",
        data: comments,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
