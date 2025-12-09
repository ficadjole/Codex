import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { IBookGenreRepository } from "../../../Domain/repositories/IBookGenreRepository";
import { BookGenre } from "../../../Domain/models/BookGenre";

export class BookGenreRepository implements IBookGenreRepository {
  async deleteGenresForBook(bookId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM bookGenre WHERE bookId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [bookId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async create(bookId: number, genreId: number): Promise<BookGenre> {
    try {
      const query = `INSERT INTO bookGenre (bookId, genreId) VALUES (?,?)`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        bookId,
        genreId,
      ]);

      if (result.affectedRows > 0) {
        return new BookGenre(bookId, genreId);
      } else {
        return new BookGenre();
      }
    } catch {
      return new BookGenre();
    }
  }
  async delete(bookId: number, genreId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM bookGenre WHERE bookId = ? AND genreId = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        bookId,
        genreId,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async update(bookGenre: BookGenre, newGenreId: number): Promise<BookGenre> {
    try {
      const query = `UPDATE bookGenre SET bookId = ? WHERE bookId = ? AND itemId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [
        newGenreId,
        bookGenre.bookId,
        bookGenre.genreId,
      ]);

      if (result.affectedRows > 0) {
        return new BookGenre(bookGenre.bookId, newGenreId);
      } else {
        return new BookGenre();
      }
    } catch {
      return new BookGenre();
    }
  }
  async getByBookId(bookId: number): Promise<BookGenre[]> {
    try {
      const query = `SELECT * FROM bookGenre WHERE bookId = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [bookId]);

      return rows.map((row) => {
        return new BookGenre(row.bookId, row.genreId);
      });
    } catch {
      return [];
    }
  }
  async getByGenreId(genreId: number): Promise<BookGenre[]> {
    try {
      const query = `SELECT * FROM bookGenre WHERE genreId = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [genreId]);

      return rows.map((row) => {
        return new BookGenre(row.bookId, row.genreId);
      });
    } catch {
      return [];
    }
  }
}
