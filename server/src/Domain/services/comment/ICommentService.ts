import { CommentDto } from "../../DTOs/comment/CommentDto";
import { Comment } from "../../models/Comment";

export interface ICommentService {
  addComment(newComment: Comment): Promise<CommentDto>;
  deleteComment(commentId: number): Promise<CommentDto>;
  getCommentsByBlogPost(blogPostId: number): Promise<CommentDto[]>;
}
