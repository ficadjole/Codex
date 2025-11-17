import { ResultSetHeader, RowDataPacket } from "mysql2";
import { BlogPostArtikal } from "../../../Domain/models/BlogPostArtikal";
import { IBlogPostArtikalRepository } from "../../../Domain/repositories/IBlogPostArtikalRepository";
import db from "../../connection/DbConnectionPool";

export class BlogPostArtikalRepository implements IBlogPostArtikalRepository {
  async dodajBlogPostArtikal(
    blog_post_id: number,
    artikal_id: number
  ): Promise<BlogPostArtikal> {
    try {
      const query = `INSERT INTO blog_post_artikal (blog_post_id, artikal_id) VALUES (?, ?)`;
      const [result] = await db.execute<ResultSetHeader>(query, [
        blog_post_id,
        artikal_id,
      ]);

      if (result.affectedRows > 0) {
        return new BlogPostArtikal(blog_post_id, artikal_id);
      } else {
        return new BlogPostArtikal();
      }
    } catch {
      return new BlogPostArtikal();
    }
  }
  async obrisiBlogPostArtikal(
    blog_post_id: number,
    artikal_id: number
  ): Promise<boolean> {
    try {
      const query = `DELETE FROM blog_post_artikal WHERE blog_post_id = ? AND artikal_id = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        blog_post_id,
        artikal_id,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async obrisiSveArtikleBloga(blog_post_id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM blog_post_artikal WHERE blog_post_id = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [blog_post_id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async getByIds(
    blog_post_id: number,
    artikal_id: number
  ): Promise<BlogPostArtikal> {
    try {
      const query = `SELECT * FROM blog_post_artikal WHERE blog_post_id = ? AND artikal_id = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [
        blog_post_id,
        artikal_id,
      ]);

      if (rows.length > 0) {
        const row = rows[0];
        return new BlogPostArtikal(row.blog_post_id, row.artikal_id);
      } else {
        return new BlogPostArtikal();
      }
    } catch {
      return new BlogPostArtikal();
    }
  }
  async getAllPoBlogPostId(blog_post_id: number): Promise<BlogPostArtikal[]> {
    try {
      const query = `SELECT * FROM blog_post_artikal WHERE blog_post_id = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [blog_post_id]);

      return rows.map(
        (row) => new BlogPostArtikal(row.blog_post_id, row.artikal_id)
      );
    } catch {
      return [];
    }
  }
}
