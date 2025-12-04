import { ResultSetHeader } from "mysql2";
import { Aksesoar } from "../../../Domain/models/Accessories";
import { IAksesoarRepository } from "../../../Domain/repositories/IAccessoryRepository";
import db from "../../connection/DbConnectionPool";

export class AksesoarRepository implements IAksesoarRepository {
  async dodajAksesoar(aksesoar: Aksesoar): Promise<Aksesoar> {
    try {
      const query =
        "INSERT INTO aksesoar (artikal_id,opis,sadrzaj) VALUES (?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        aksesoar.artikal_id,
        aksesoar.opis,
        aksesoar.sadrzaj,
      ]);

      if (result.affectedRows > 0) {
        return new Aksesoar(
          aksesoar.artikal_id,
          aksesoar.naziv,
          aksesoar.cena,
          aksesoar.slika_url,
          aksesoar.korisnik_id,
          aksesoar.opis,
          aksesoar.sadrzaj
        );
      } else {
        return new Aksesoar();
      }
    } catch (error) {
      return new Aksesoar();
    }
  }
  async azurirajAksesoar(aksesoar: Aksesoar): Promise<Aksesoar> {
    try {
      const query =
        "UPDATE aksesoar SET opis = ?, sadrzaj = ? WHERE artikal_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        aksesoar.opis,
        aksesoar.sadrzaj,
        aksesoar.artikal_id,
      ]);

      if (result.affectedRows > 0) {
        return aksesoar;
      } else {
        return new Aksesoar();
      }
    } catch {
      return new Aksesoar();
    }
  }
  // async obrisiAksesoar(artikal_id: number): Promise<boolean> {
  //   try {
  //     const query = "DELETE FROM aksesoar WHERE artikal_id = ?";

  //     const [result] = await db.execute<ResultSetHeader>(query, [artikal_id]);
  //     console.log("Rezultat brisanja aksesoara: ", result);
  //     return result.affectedRows > 0;
  //   } catch (error) {
  //     console.error("Greska pri brisanju aksesoara:", error);

  //     return false;
  //   }
  // }
  async getByAksesoarID(artikal_id: number): Promise<Aksesoar> {
    try {
      const query = "SELECT * FROM aksesoar WHERE artikal_id = ?";

      const [rows] = await db.execute<any[]>(query, [artikal_id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Aksesoar(
          row.artikal_id,
          row.naziv,
          row.cena,
          row.slika_url,
          row.korisnik_id,
          row.opis,
          row.sadrzaj
        );
      } else {
        return new Aksesoar();
      }
    } catch {
      return new Aksesoar();
    }
  }
}
