import { ResultSetHeader } from "mysql2";
import { Korisnik } from "../../../Domain/models/Korisnik";
import { IKorisnikRepository } from "../../../Domain/repositories/korisnik/IKorisnikRepository";
import db from "../../connection/DbConnectionPool";

export class KorisnikRepository implements IKorisnikRepository {
  async create(korisnik: Korisnik): Promise<Korisnik> {
    try {
      const queary =
        "INSERT INTO korisnici (ime,prezime,email,korisnicko_ime,lozinka_hash,uloga) VALUES (?,?,?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(queary, [
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
    } catch (error) {
      console.log(error);
      return new Korisnik();
    }
  }
  async getById(korisnik_id: number): Promise<Korisnik> {
    throw new Error("Method not implemented.");
  }
  async getByKorisnickoIme(korisnicko_ime: string): Promise<Korisnik> {
    throw new Error("Method not implemented.");
  }
  async getAll(): Promise<Korisnik> {
    throw new Error("Method not implemented.");
  }
  async update(korisnik: Korisnik): Promise<Korisnik> {
    throw new Error("Method not implemented.");
  }
  async delete(korisnik_id: number): Promise<Korisnik> {
    throw new Error("Method not implemented.");
  }
  async exists(korisnik_id: number): Promise<Korisnik> {
    throw new Error("Method not implemented.");
  }
}
