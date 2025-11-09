import { ResultSetHeader, RowDataPacket } from "mysql2";
import { TipArtikla } from "../../../Domain/enums/TipArtikla";
import { Artikal } from "../../../Domain/models/Artikal";
import { IArtikalRepository } from "../../../Domain/repositories/IArtikalRepository";
import db from "../../connection/DbConnectionPool";

export class ArtikalRepository implements IArtikalRepository {
  async dodajArtikal(artikal: Artikal): Promise<Artikal> {
    try {
      const query =
        "INSERT INTO artikal (naziv,cena,slika_url,tip,korisnik_id) VALUES (?,?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        artikal.naziv,
        artikal.cena,
        artikal.slika_url,
        artikal.tip,
        artikal.korisnik_id,
      ]);

      if (result.affectedRows > 0) {
        return new Artikal(
          result.insertId,
          artikal.naziv,
          artikal.cena,
          artikal.slika_url,
          artikal.tip,
          artikal.korisnik_id,
          new Date()
        );
      } else {
        return new Artikal();
      }
    } catch {
      return new Artikal();
    }
  }
  async azurirajArtikal(artikal: Artikal): Promise<Artikal> {
    try {
      const query =
        "UPDATE artikal SET naziv = ?,cena = ?,slika_url = ?,tip = ? WHERE artikal_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        artikal.naziv,
        artikal.cena,
        artikal.slika_url,
        artikal.tip,
        artikal.artikal_id,
      ]);

      if (result.affectedRows > 0) {
        return artikal;
      } else {
        return new Artikal();
      }
    } catch {
      return new Artikal();
    }
  }
  async getByNazivArtikla(naziv: string): Promise<Artikal> {
    try {
      const query = "SELECT * FROM artikal WHERE naziv = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [naziv]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Artikal(
          row.artikal_id,
          row.naziv,
          row.cena,
          row.slika_url,
          row.tip,
          row.korisnik_id,
          row.datumKreiranja
        );
      } else {
        return new Artikal();
      }
    } catch {
      return new Artikal();
    }
  }
  async getByArtikalId(artikal_id: number): Promise<Artikal> {
    try {
      const query = "SELECT * FROM artikal WHERE artikal_id = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [artikal_id]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Artikal(
          row.artikal_id,
          row.naziv,
          row.cena,
          row.slika_url,
          row.tip,
          row.korisnik_id,
          row.datumKreiranja
        );
      } else {
        return new Artikal();
      }
    } catch {
      return new Artikal();
    }
  }
  async getByTipArtikla(tip: TipArtikla): Promise<Artikal[]> {
    try {
      const query = "SELECT * FROM artikal WHERE tip = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [tip]);

      return rows.map(
        (row) =>
          new Artikal(
            row.artikal_id,
            row.naziv,
            row.cena,
            row.slika_url,
            row.tip,
            row.korisnik_id,
            row.datumKreiranja
          )
      );
    } catch {
      return [];
    }
  }
  async getAll(): Promise<Artikal[]> {
    try {
      const query = "SELECT * FROM artikal ORDER BY artikal_id ASC";

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new Artikal(
            row.artikal_id,
            row.naziv,
            row.cena,
            row.slika_url,
            row.tip,
            row.korisnik_id,
            row.datumKreiranja
          )
      );
    } catch {
      return [];
    }
  }
  async obrisiArtikal(artikal_id: number): Promise<boolean> {
    try {
      const query = "DELETE FROM artikal WHERE artikal_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [artikal_id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
