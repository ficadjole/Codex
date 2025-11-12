import { ResultSetHeader, RowDataPacket } from "mysql2";
import { KnjigaKategorija } from "../../../Domain/models/KnjigaKategorija";
import { IKnjigaKategorijaRepository } from "../../../Domain/repositories/IKnjigaKategorijaRepository";
import db from "../../connection/DbConnectionPool";

export class KnjigaKategorijaRepository implements IKnjigaKategorijaRepository {
  async obrisiKategorijeZaKnjigu(knjiga_id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM knjiga_kategorija WHERE knjiga_id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [knjiga_id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async dodajKnjigaKategorija(
    knjiga_id: number,
    kategorija_id: number
  ): Promise<KnjigaKategorija> {
    try {
      const query = `INSERT INTO knjiga_kategorija (knjiga_id, kategorija_id) VALUES (?,?)`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        knjiga_id,
        kategorija_id,
      ]);

      if (result.affectedRows > 0) {
        return new KnjigaKategorija(knjiga_id, kategorija_id);
      } else {
        return new KnjigaKategorija();
      }
    } catch {
      return new KnjigaKategorija();
    }
  }
  async obrisiKnjigaKategorija(
    knjiga_id: number,
    kategorija_id: number
  ): Promise<boolean> {
    try {
      const query = `DELETE FROM knjiga_kategorija WHERE knjiga_id = ? AND kategorija_id = ?`;

      const [result] = await db.execute<ResultSetHeader>(query, [
        knjiga_id,
        kategorija_id,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async azurirajKnjigaKategorija(
    knjigaKategorija: KnjigaKategorija,
    id_nove_kategorije: number
  ): Promise<KnjigaKategorija> {
    try {
      const query = `UPDATE knjiga_kategorija SET kategorija_id = ? WHERE knjiga_id = ? AND kategorija_id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [
        id_nove_kategorije,
        knjigaKategorija.knjiga_id,
        knjigaKategorija.kategorija_id,
      ]);

      if (result.affectedRows > 0) {
        return new KnjigaKategorija(
          knjigaKategorija.knjiga_id,
          id_nove_kategorije
        );
      } else {
        return new KnjigaKategorija();
      }
    } catch {
      return new KnjigaKategorija();
    }
  }
  async getByKnjigaId(knjiga_id: number): Promise<KnjigaKategorija[]> {
    try {
      const query = `SELECT * FROM knjiga_kategorija WHERE knjiga_id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [knjiga_id]);

      return rows.map((row) => {
        return new KnjigaKategorija(row.knjiga_id, row.kategorija_id);
      });
    } catch {
      return [];
    }
  }
  async getByKategorijaId(kategorija_id: number): Promise<KnjigaKategorija[]> {
    try {
      const query = `SELECT * FROM knjiga_kategorija WHERE kategorija_id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [kategorija_id]);

      return rows.map((row) => {
        return new KnjigaKategorija(row.knjiga_id, row.kategorija_id);
      });
    } catch {
      return [];
    }
  }
}
