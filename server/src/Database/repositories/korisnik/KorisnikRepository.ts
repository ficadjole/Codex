import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Korisnik } from "../../../Domain/models/Korisnik";
import { IKorisnikRepository } from "../../../Domain/repositories/IKorisnikRepository";
import db from "../../connection/DbConnectionPool";

export class KorisnikRepository implements IKorisnikRepository {
  async create(korisnik: Korisnik): Promise<Korisnik> {
    try {
      const query =
        "INSERT INTO korisnik (ime,prezime,email,korisnicko_ime,lozinka_hash,uloga) VALUES (?,?,?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        korisnik.ime,
        korisnik.prezime,
        korisnik.email,
        korisnik.korisnicko_ime,
        korisnik.lozinka_hash,
        korisnik.uloga,
      ]);

      if (result.insertId) {
        return new Korisnik(
          result.insertId,
          korisnik.ime,
          korisnik.prezime,
          korisnik.email,
          korisnik.korisnicko_ime,
          korisnik.lozinka_hash,
          korisnik.uloga,
          new Date()
        );
      } else {
        return new Korisnik();
      }
    } catch {
      return new Korisnik();
    }
  }
  async getById(korisnik_id: number): Promise<Korisnik> {
    try {
      const query = "SELECT * FROM korisnik WHERE korisnik_id = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [korisnik_id]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Korisnik(
          row.korisnik_id,
          row.ime,
          row.prezime,
          row.email,
          row.korisnicko_ime,
          row.lozinka_hash,
          row.uloga
        );
      } else {
        return new Korisnik();
      }
    } catch {
      return new Korisnik();
    }
  }
  async getByKorisnickoIme(korisnicko_ime: string): Promise<Korisnik> {
    try {
      const query = "SELECT * FROM korisnik WHERE korisnicko_ime = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [korisnicko_ime]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Korisnik(
          row.korisnik_id,
          row.ime,
          row.prezime,
          row.email,
          row.korisnicko_ime,
          row.lozinka_hash,
          row.uloga
        );
      } else {
        return new Korisnik();
      }
    } catch {
      return new Korisnik();
    }
  }

  async getByEmail(email: string): Promise<Korisnik> {
    try {
      const query = "SELECT * FROM korisnik WHERE email = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Korisnik(
          row.korisnik_id,
          row.ime,
          row.prezime,
          row.email,
          row.korisnicko_ime,
          row.lozinka_hash,
          row.uloga
        );
      } else {
        return new Korisnik();
      }
    } catch {
      return new Korisnik();
    }
  }

  async getAll(): Promise<Korisnik[]> {
    try {
      const query = "SELECT * FROM korisnik";

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new Korisnik(
            row.korisnik_id,
            row.ime,
            row.prezime,
            row.email,
            row.korisnicko_ime,
            row.lozinka_hash,
            row.uloga
          )
      );
    } catch {
      return [];
    }
  }
  async update(korisnik: Korisnik): Promise<Korisnik> {
    try {
      const query =
        "UPDATE korisnik SET ime = ?, prezime = ?, email = ?, korisnicko_ime = ? WHERE korisnik_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        korisnik.ime,
        korisnik.prezime,
        korisnik.email,
        korisnik.korisnicko_ime,
        korisnik.korisnik_id,
      ]);

      if (result.affectedRows > 0) {
        return korisnik;
      } else {
        return new Korisnik();
      }
    } catch {
      return new Korisnik();
    }
  }
  async delete(korisnik_id: number): Promise<boolean> {
    try {
      const query = "DELETE FROM korisnik WHERE korisnik_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [korisnik_id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async exists(korisnik_id: number): Promise<boolean> {
    try {
      const query =
        "SELECT COUNT(*) as count FROM korisnik WHERE korisnik_id = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [korisnik_id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}
