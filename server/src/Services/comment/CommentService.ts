import { CommentDto } from "../../Domain/DTOs/comment/CommentDto";
import { Comment } from "../../Domain/models/Comment";
import { ICommentRepository } from "../../Domain/repositories/ICommentRepository";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { ICommentService } from "../../Domain/services/comment/ICommentService";

export class CommentService implements ICommentService {
  constructor(
    private commentRepository: ICommentRepository,
    private userRepository: IUserRepository
  ) {}

  async addComment(newComment: Comment): Promise<CommentDto> {
    const addedComment = await this.commentRepository.create(newComment);

    if (addedComment.commentId !== 0) {
      return this.mapToDTO(addedComment);
    } else {
      return new CommentDto();
    }
  }

  async deleteComment(commentId: number): Promise<CommentDto> {
    const existingComment = await this.commentRepository.getById(commentId);
    if (existingComment.commentId === 0) return new CommentDto();

    const deleted = await this.commentRepository.deleteComment(commentId);
    if (deleted) return this.mapToDTO(existingComment);
    return new CommentDto();
  }

  async getCommentsByBlogPost(blogPostId: number): Promise<CommentDto[]> {
    const comments = await this.commentRepository.getCommentsByBlogPost(blogPostId);
    if (comments.length === 0) return [new CommentDto()];

    return await Promise.all(comments.map((c) => this.mapToDTO(c)));
  }

  private async mapToDTO(comment: Comment): Promise<CommentDto> {
    const author = await this.userRepository.getById(comment.userId);
    return new CommentDto(
      comment.commentId,
      comment.commentText,
      comment.dateCreated,
      {
        userId: author.userId,
        username: author.username,
      }
    );
  }
}
