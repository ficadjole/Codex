import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { IGenreRepository } from "../../../Domain/repositories/IGenreRepository";
import { Genre } from "../../../Domain/models/Genre";

export class GenreRepository implements IGenreRepository {
  async create(name: string): Promise<Genre> {
    try {
      const query = `INSERT INTO genres (genreName) VALUES (?)`;

      const [result] = await db.execute<ResultSetHeader>(query, [name]);

      if (result.insertId) {
        return new Genre(result.insertId, name);
      } else {
        return new Genre();
      }
    } catch {
      return new Genre();
    }
  }
  async delete(genreId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM genres WHERE kategorija_id = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [genreId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async update(genre: Genre): Promise<Genre> {
    try {
      const query = `UPDATE genres SET genreName = ? WHERE genreId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [
        genre.name,
        genre.genreId,
      ]);

      if (result.affectedRows > 0) {
        return genre;
      } else {
        return new Genre();
      }
    } catch {
      return new Genre();
    }
  }
  async getByName(name: string): Promise<Genre> {
    try {
      const query = `SELECT * FROM genres WHERE genreName = ?`;
      const [rows] = await db.execute<any[]>(query, [name]);
      if (rows.length > 0) {
        const row = rows[0];
        return new Genre(row.genreId, row.genreName);
      } else {
        return new Genre();
      }
    } catch {
      return new Genre();
    }
  }
  async getById(genreId: number): Promise<Genre> {
    try {
      const query = `SELECT * FROM genres WHERE genreId = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [genreId]);
      if (rows.length > 0) {
        const row = rows[0];
        return new Genre(row.genreId, row.genreName);
      } else {
        return new Genre();
      }
    } catch {
      return new Genre();
    }
  }
  async getAll(): Promise<Genre[]> {
    try {
      const query = `SELECT * FROM genres`;
      const [rows] = await db.execute<RowDataPacket[]>(query);
      return rows.map((row) => new Genre(row.genreId, row.genreName));
    } catch {
      return [];
    }
  }
}
