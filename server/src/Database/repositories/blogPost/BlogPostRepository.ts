import { ResultSetHeader, RowDataPacket } from "mysql2";
import { BlogPost } from "../../../Domain/models/BlogPost";
import { IBlogPostRepository } from "../../../Domain/repositories/IBlogPostRepository";
import db from "../../connection/DbConnectionPool";
import { BlogPostType } from "../../../Domain/enums/BlogPostType";

export class BlogPostRepository implements IBlogPostRepository {
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const query = `SELECT * FROM blogPosts`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new BlogPost(
            row.blogPostId,
            row.title,
            row.imgUrl,
            row.content,
            row.blogPostType,
            new Date(row.publicationYear),
            row.userId
          )
      );
    } catch {
      return [];
    }
  }

  async getBlogPostById(id: number): Promise<BlogPost> {
    try {
      const query = `SELECT * FROM blogPosts WHERE blogPostId = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new BlogPost(
          row.blogPostId,
          row.title,
          row.imgUrl,
          row.content,
          row.blogPostType,
          new Date(row.publicationYear),
          row.userId
        );
      } else {
        return new BlogPost();
      }
    } catch {
      return new BlogPost();
    }
  }

  async getBlogPostsByType(type: BlogPostType): Promise<BlogPost[]> {
    try {
      const query = `SELECT * FROM blogPosts WHERE blogPostType = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [type]);

      return rows.map(
        (row) =>
          new BlogPost(
            row.blogPostId,
            row.title,
            row.imgUrl,
            row.content,
            row.blogPostType,
            new Date(row.publicationYear),
            row.userId
          )
      );
    } catch {
      return [];
    }
  }

  async createBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    try {
      const query = `INSERT INTO blogPosts (title, imgUrl, content, blogPostType, userId) VALUES (?, ?, ?, ?, ?)`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPost.title,
        blogPost.imgUrl,
        blogPost.content,
        blogPost.postType,
        blogPost.userId,
      ]);

      if (result.affectedRows > 0) {
        return new BlogPost(
          result.insertId,
          blogPost.title,
          blogPost.imgUrl,
          blogPost.content,
          blogPost.postType,
          blogPost.publishDate,
          blogPost.userId
        );
      } else {
        return new BlogPost();
      }
    } catch (error) {
      console.log(error);
      return new BlogPost();
    }
  }

  async updateBlogPost(id: number, blogPost: any): Promise<BlogPost> {
    try {
      const query = `UPDATE blogPosts SET title = ?, imgUrl = ?, content = ?, blogPostType = ?, userId = ? WHERE blogPostId = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPost.title,
        blogPost.imgUrl,
        blogPost.content,
        blogPost.postType,
        blogPost.userId,
        id,
      ]);

      if (result.affectedRows > 0) {
        return new BlogPost(
          id,
          blogPost.title,
          blogPost.imgUrl,
          blogPost.content,
          blogPost.postType,
          blogPost.publishDate,
          blogPost.userId
        );
      } else {
        return new BlogPost();
      }
    } catch {
      return new BlogPost();
    }
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM blogPosts WHERE blogPostId = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
