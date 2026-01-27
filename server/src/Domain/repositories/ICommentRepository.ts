import { Comment } from "../models/Comment";

export interface ICommentRepository {
  create(comment: Comment): Promise<Comment>;
  deleteComment(commentId: number): Promise<boolean>;
  getCommentsByBlogPost(blogPostId: number): Promise<Comment[]>;
  getById(commentId: number): Promise<Comment>;
}
