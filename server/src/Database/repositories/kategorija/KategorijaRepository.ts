import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Kategorija } from "../../../Domain/models/Kategorija";
import { IKategorijaRepository } from "../../../Domain/repositories/IKategorijaRepository";
import db from "../../connection/DbConnectionPool";

export class KategorijaRepository implements IKategorijaRepository {
  async dodajKategoriju(naziv: string): Promise<Kategorija> {
    try {
      const query = `INSERT INTO kategorija (naziv) VALUES (?)`;

      const [result] = await db.execute<ResultSetHeader>(query, [naziv]);

      if (result.insertId) {
        return new Kategorija(result.insertId, naziv);
      } else {
        return new Kategorija();
      }
    } catch {
      return new Kategorija();
    }
  }
  async obrisiKategoriju(kategorija_id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM kategorija WHERE kategorija_id = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        kategorija_id,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async azurirajKategoriju(kategorija: Kategorija): Promise<Kategorija> {
    try {
      const query = `UPDATE kategorija SET naziv = ? WHERE kategorija_id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [
        kategorija.naziv,
        kategorija.kategorija_id,
      ]);

      if (result.affectedRows > 0) {
        return kategorija;
      } else {
        return new Kategorija();
      }
    } catch {
      return new Kategorija();
    }
  }
  async getByNazivKategorije(naziv: string): Promise<Kategorija> {
    try {
      const query = `SELECT * FROM kategorija WHERE naziv = ?`;
      const [rows] = await db.execute<any[]>(query, [naziv]);
      if (rows.length > 0) {
        const row = rows[0];
        return new Kategorija(row.kategorija_id, row.naziv);
      } else {
        return new Kategorija();
      }
    } catch {
      return new Kategorija();
    }
  }
  async getByKategorijaID(kategorija_id: number): Promise<Kategorija> {
    try {
      const query = `SELECT * FROM kategorija WHERE kategorija_id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [kategorija_id]);
      if (rows.length > 0) {
        const row = rows[0];
        return new Kategorija(row.kategorija_id, row.naziv);
      } else {
        return new Kategorija();
      }
    } catch {
      return new Kategorija();
    }
  }
  async getAll(): Promise<Kategorija[]> {
    try {
      const query = `SELECT * FROM kategorija`;
      const [rows] = await db.execute<RowDataPacket[]>(query);
      return rows.map((row) => new Kategorija(row.kategorija_id, row.naziv));
    } catch {
      return [];
    }
  }
}
