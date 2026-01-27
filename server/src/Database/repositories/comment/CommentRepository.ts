import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { Comment } from "../../../Domain/models/Comment";
import { ICommentRepository } from "../../../Domain/repositories/ICommentRepository";

export class CommentRepository implements ICommentRepository {
  async create(comment: Comment): Promise<Comment> {
    try {
      const query =
        "INSERT INTO blogComments (blogPostId, userId, commentText) VALUES (?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        comment.blogPostId,
        comment.userId,
        comment.commentText,
      ]);

      if (result.affectedRows > 0) {
        return new Comment(
          result.insertId,
          comment.blogPostId,
          comment.userId,
          comment.commentText,
          new Date()
        );
      } else {
        return new Comment();
      }
    } catch {
      return new Comment();
    }
  }

  async deleteComment(commentId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM blogComments WHERE commentId = ?";
      const [result] = await db.execute<ResultSetHeader>(query, [commentId]);
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async getCommentsByBlogPost(blogPostId: number): Promise<Comment[]> {
    try {
      const query =
        "SELECT * FROM blogComments WHERE blogPostId = ? ORDER BY commentId ASC";
      const [rows] = await db.execute<RowDataPacket[]>(query, [blogPostId]);

      return rows.map(
        (row) =>
          new Comment(
            row.commentId,
            row.blogPostId,
            row.userId,
            row.commentText,
            row.dateCreated
          )
      );
    } catch {
      return [];
    }
  }

  async getById(commentId: number): Promise<Comment> {
    try {
      const query = "SELECT * FROM blogComments WHERE commentId = ?";
      const [rows] = await db.execute<RowDataPacket[]>(query, [commentId]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Comment(
          row.commentId,
          row.blogPostId,
          row.userId,
          row.commentText,
          row.dateCreated
        );
      } else {
        return new Comment();
      }
    } catch {
      return new Comment();
    }
  }
}
