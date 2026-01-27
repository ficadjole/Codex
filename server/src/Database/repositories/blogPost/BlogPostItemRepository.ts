import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { BlogPostItem } from "../../../Domain/models/BlogPostItem";
import { IBlogPostItemRepository } from "../../../Domain/repositories/IBlogPostItemRepository";

export class BlogPostItemRepository implements IBlogPostItemRepository {
  async addBlogPostItem(
    blogPostId: number,
    itemId: number
  ): Promise<BlogPostItem> {
    try {
      const query = `INSERT INTO blogPostItem (blogPostId, itemId) VALUES (?, ?)`;
      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPostId,
        itemId,
      ]);

      if (result.affectedRows > 0) {
        return new BlogPostItem(blogPostId, itemId);
      } else {
        return new BlogPostItem();
      }
    } catch {
      return new BlogPostItem();
    }
  }

  async deleteBlogPostItem(
    blogPostId: number,
    itemId: number
  ): Promise<boolean> {
    try {
      const query = `DELETE FROM blogPostItem WHERE blogPostId = ? AND itemId = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPostId,
        itemId,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async deleteAllItemsFromBlog(blogPostId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM blogPostItem WHERE blogPostId = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [blogPostId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async getByIds(blogPostId: number, itemId: number): Promise<BlogPostItem> {
    try {
      const query = `SELECT * FROM blogPostItem WHERE blogPostId = ? AND itemId = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [
        blogPostId,
        itemId,
      ]);

      if (rows.length > 0) {
        const row = rows[0];
        return new BlogPostItem(row.blogPostId, row.itemId);
      } else {
        return new BlogPostItem();
      }
    } catch {
      return new BlogPostItem();
    }
  }

  async getAllByBlogPostId(blogPostId: number): Promise<BlogPostItem[]> {
    try {
      const query = `SELECT * FROM blogPostItem WHERE blogPostId = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [blogPostId]);

      return rows.map(
        (row) => new BlogPostItem(row.blogPostId, row.itemId)
      );
    } catch {
      return [];
    }
  }
}
