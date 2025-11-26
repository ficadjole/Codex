import { Komentar } from "../models/Komentar";

export interface IKomentarRepository {
  dodajKomentar(komentar: Komentar): Promise<Komentar>;
  obrisiKomentar(komentar_id: number): Promise<boolean>;
  prikaziSveKomentareZaBlogPost(blog_post_id: number): Promise<Komentar[]>;
  getByIdKomentara(komentar_id: number): Promise<Komentar>;
}
