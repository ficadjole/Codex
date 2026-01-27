import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { IGenreRepository } from "../../../Domain/repositories/IGenreRepository";
import { Genre } from "../../../Domain/models/Genre";

export class GenreRepository implements IGenreRepository {
  async create(name: string): Promise<Genre> {
    try {
      const query = `INSERT INTO genres (genreName) VALUES (?)`;
      const [result] = await db.execute<ResultSetHeader>(query, [name]);
      return result.insertId ? new Genre(result.insertId, name) : new Genre();
    } catch {
      return new Genre();
    }
  }

  async delete(genreId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM genres WHERE genreId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [genreId]);
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async update(genre: Genre): Promise<Genre> {
    try {
      const query = `UPDATE genres SET genreName = ? WHERE genreId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [genre.name, genre.genreId]);
      return result.affectedRows > 0 ? genre : new Genre();
    } catch {
      return new Genre();
    }
  }

  async getByName(name: string): Promise<Genre> {
    try {
      const query = `SELECT * FROM genres WHERE genreName = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [name]);
      return rows.length ? new Genre(rows[0].genreId, rows[0].genreName) : new Genre();
    } catch {
      return new Genre();
    }
  }

  async getById(genreId: number): Promise<Genre> {
    try {
      const query = `SELECT * FROM genres WHERE genreId = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [genreId]);
      return rows.length ? new Genre(rows[0].genreId, rows[0].genreName) : new Genre();
    } catch {
      return new Genre();
    }
  }

  async getAll(): Promise<Genre[]> {
    try {
      const query = `SELECT * FROM genres`;
      const [rows] = await db.execute<RowDataPacket[]>(query);
      return rows.map(row => new Genre(row.genreId, row.genreName));
    } catch {
      return [];
    }
  }
}
