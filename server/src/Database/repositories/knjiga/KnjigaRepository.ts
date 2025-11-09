import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Knjiga } from "../../../Domain/models/Knjiga";
import { IKnjigaRepository } from "../../../Domain/repositories/IKnjigaRepository";
import db from "../../connection/DbConnectionPool";

export class KnjigaRepository implements IKnjigaRepository {
  async dodajKnjigu(knjiga: Knjiga): Promise<Knjiga> {
    try {
      const query =
        "INSERT INTO knjiga (artikal_id,isbn,autor,broj_strana,korice,godina_izdanja,opis,goodreads_link) VALUES (?,?,?,?,?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        knjiga.artikal_id,
        knjiga.isbn,
        knjiga.autor,
        knjiga.broj_strana,
        knjiga.korice,
        knjiga.godina_izdanja,
        knjiga.opis,
        knjiga.goodreads_link,
      ]);

      if (result.affectedRows > 0) {
        return new Knjiga(
          knjiga.artikal_id,
          knjiga.naziv,
          knjiga.cena,
          knjiga.slika_url,
          knjiga.korisnik_id,
          knjiga.isbn,
          knjiga.autor,
          knjiga.broj_strana,
          knjiga.korice,
          knjiga.godina_izdanja,
          knjiga.opis,
          knjiga.goodreads_link
        );
      } else {
        return new Knjiga();
      }
    } catch {
      return new Knjiga();
    }
  }
  async azurirajKnjigu(knjiga: Knjiga): Promise<Knjiga> {
    try {
      const query =
        "UPDATE knjiga SET isbn = ?, autor = ?, broj_strana = ?, korice = ?, godina_izdanja = ?, opis = ?, goodreads_link = ? WHERE artikal_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        knjiga.isbn,
        knjiga.autor,
        knjiga.broj_strana,
        knjiga.korice,
        knjiga.godina_izdanja,
        knjiga.opis,
        knjiga.goodreads_link,
        knjiga.artikal_id,
      ]);

      if (result.affectedRows > 0) {
        return knjiga;
      } else {
        return new Knjiga();
      }
    } catch {
      return new Knjiga();
    }
  }
  async obrisiKnjigu(artikal_id: number): Promise<boolean> {
    try {
      const query = "DELETE FROM knjiga WHERE artikal_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [artikal_id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async getByKnjigaID(artikal_id: number): Promise<Knjiga> {
    try {
      const query = "SELECT * FROM knjiga WHERE artikal_id = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [artikal_id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Knjiga(
          row.artikal_id,
          row.naziv,
          row.cena,
          row.slika_url,
          row.korisnik_id,
          row.isbn,
          row.autor,
          row.broj_strana,
          row.korice,
          row.godina_izdanja,
          row.opis,
          row.goodreads_link
        );
      } else {
        return new Knjiga();
      }
    } catch {
      return new Knjiga();
    }
  }
  async getByAutor(autor: string): Promise<Knjiga[]> {
    try {
      const query =
        "SELECT * FROM knjiga WHERE autor = ? ORDER BY godina_izdanja DESC";

      const [rows] = await db.execute<RowDataPacket[]>(query, [autor]);

      return rows.map(
        (row) =>
          new Knjiga(
            row.artikal_id,
            row.naziv,
            row.cena,
            row.slika_url,
            row.korisnik_id,
            row.isbn,
            row.autor,
            row.broj_strana,
            row.korice,
            row.godina_izdanja,
            row.opis,
            row.goodreads_link
          )
      );
    } catch {
      return [];
    }
  }
}
