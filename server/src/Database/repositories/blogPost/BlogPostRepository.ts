import { ResultSetHeader, RowDataPacket } from "mysql2";
import { TipBlogPosta } from "../../../Domain/enums/TipBlogPosta";
import { BlogPost } from "../../../Domain/models/BlogPost";
import { IBlogPostRepository } from "../../../Domain/repositories/IBlogPostRepository";
import db from "../../connection/DbConnectionPool";

export class BlogPostRepository implements IBlogPostRepository {
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const query = `SELECT * FROM blog_post`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      if (rows.length > 0) {
        return rows.map(
          (row) =>
            new BlogPost(
              row.blog_post_id,
              row.naslov,
              row.slika_url,
              row.sadrzaj,
              row.tipPosta,
              new Date(row.datum_objave),
              row.admin_id
            )
        );
      } else {
        return [];
      }
    } catch {
      return [];
    }
  }
  async getBlogPostById(id: number): Promise<BlogPost> {
    try {
      const query = `SELECT * FROM blog_post WHERE blog_post_id = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new BlogPost(
          row.blog_post_id,
          row.naslov,
          row.slika_url,
          row.sadrzaj,
          row.tipPosta,
          new Date(row.datum_objave),
          row.admin_id
        );
      } else {
        return new BlogPost();
      }
    } catch {
      return new BlogPost();
    }
  }
  async getBlogPostsPoTipu(tip: TipBlogPosta): Promise<BlogPost[]> {
    try {
      const query = `SELECT * FROM blog_post WHERE tip = ?`;

      const [rows] = await db.execute<RowDataPacket[]>(query, [tip]);

      if (rows.length > 0) {
        return rows.map(
          (row) =>
            new BlogPost(
              row.blog_post_id,
              row.naslov,
              row.slika_url,
              row.sadrzaj,
              row.tipPosta,
              new Date(row.datum_objave),
              row.admin_id
            )
        );
      } else {
        return [];
      }
    } catch {
      return [];
    }
  }
  async createBlogPost(blogPost: BlogPost): Promise<BlogPost> {
    try {
      const query = `INSERT INTO blog_post (naslov, slika_url, sadrzaj, tip, korisnik_id) VALUES (?, ?, ?, ?, ?)`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPost.naslov,
        blogPost.slika_url,
        blogPost.sadrzaj,
        blogPost.tipPosta,
        blogPost.admin_id,
      ]);

      if (result.affectedRows > 0) {
        return new BlogPost(
          result.insertId,
          blogPost.naslov,
          blogPost.slika_url,
          blogPost.sadrzaj,
          blogPost.tipPosta,
          blogPost.datum_objave,
          blogPost.admin_id
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
      const query = `UPDATE blog_post SET naslov = ?, slika_url = ?, sadrzaj = ?, tip = ?, korisnik_id = ? WHERE blog_post_id = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        blogPost.naslov,
        blogPost.slika_url,
        blogPost.sadrzaj,
        blogPost.tipPosta,
        blogPost.admin_id,
        id,
      ]);

      if (result.affectedRows > 0) {
        return new BlogPost(
          id,
          blogPost.naslov,
          blogPost.slika_url,
          blogPost.sadrzaj,
          blogPost.tipPosta,
          blogPost.datum_objave,
          blogPost.admin_id
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
      const query = `DELETE FROM blog_post WHERE blog_post_id = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
