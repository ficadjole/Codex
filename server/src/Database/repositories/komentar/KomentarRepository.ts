import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Komentar } from "../../../Domain/models/Komentar";
import { IKomentarRepository } from "../../../Domain/repositories/IKomentarRepository";
import db from "../../connection/DbConnectionPool";

export class KomentarRepository implements IKomentarRepository {
  async dodajKomentar(komentar: Komentar): Promise<Komentar> {
    try {
      const query =
        "INSERT INTO blog_komentar (blog_post_id,korisnik_id,tekst) VALUES (?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        komentar.blog_post_id,
        komentar.korisnik_id,
        komentar.tekst,
      ]);

      if (result.affectedRows > 0) {
        return new Komentar(
          result.insertId,
          komentar.blog_post_id,
          komentar.korisnik_id,
          komentar.tekst,
          new Date()
        );
      } else {
        return new Komentar();
      }
    } catch {
      return new Komentar();
    }
  }
  async obrisiKomentar(komentar_id: number): Promise<boolean> {
    try {
      const query = "DELETE FROM blog_komentar WHERE komentar_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [komentar_id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async prikaziSveKomentareZaBlogPost(
    blog_post_id: number
  ): Promise<Komentar[]> {
    try {
      const query =
        "SELECT * FROM blog_komentar WHERE blog_post_id = ? ORDER BY komentar_id ASC";

      const [rows] = await db.execute<RowDataPacket[]>(query, [blog_post_id]);

      return rows.map(
        (row) =>
          new Komentar(
            row.komentar_id,
            row.blog_post_id,
            row.korisnik_id,
            row.tekst,
            row.datum_komentara
          )
      );
    } catch {
      return [];
    }
  }
  async getByIdKomentara(komentar_id: number): Promise<Komentar> {
    try {
      const query = "SELECT * FROM blog_komentar WHERE komentar_id = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [komentar_id]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Komentar(
          row.komentar_id,
          row.blog_post_id,
          row.korisnik_id,
          row.tekst,
          row.datum_komentara
        );
      } else {
        return new Komentar();
      }
    } catch {
      return new Komentar();
    }
  }
}
