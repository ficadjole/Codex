import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { BookGenre } from "../../../Domain/models/BookGenre";
import { IBookGenreRepository } from "../../../Domain/repositories/IBookGenreRepository";

export class BookGenreRepository implements IBookGenreRepository {
  async create(bookId: number, genreId: number): Promise<BookGenre> {
    try {
      const query = `INSERT INTO bookGenre (bookId, genreId) VALUES (?, ?)`;
      const [result] = await db.execute<ResultSetHeader>(query, [bookId, genreId]);
      return result.affectedRows > 0 ? new BookGenre(bookId, genreId) : new BookGenre();
    } catch {
      return new BookGenre();
    }
  }

  async delete(bookId: number, genreId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM bookGenre WHERE bookId = ? AND genreId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [bookId, genreId]);
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async deleteGenresForBook(bookId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM bookGenre WHERE bookId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [bookId]);
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async update(bookGenre: BookGenre, newGenreId: number): Promise<BookGenre> {
    try {
      const query = `UPDATE bookGenre SET genreId = ? WHERE bookId = ? AND genreId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [newGenreId, bookGenre.bookId, bookGenre.genreId]);
      return result.affectedRows > 0 ? new BookGenre(bookGenre.bookId, newGenreId) : new BookGenre();
    } catch {
      return new BookGenre();
    }
  }

  async getByBookId(bookId: number): Promise<BookGenre[]> {
    try {
      const query = `SELECT * FROM bookGenre WHERE bookId = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [bookId]);
      return rows.map(row => new BookGenre(row.bookId, row.genreId));
    } catch {
      return [];
    }
  }

  async getByGenreId(genreId: number): Promise<BookGenre[]> {
    try {
      const query = `SELECT * FROM bookGenre WHERE genreId = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [genreId]);
      return rows.map(row => new BookGenre(row.bookId, row.genreId));
    } catch {
      return [];
    }
  }
}
