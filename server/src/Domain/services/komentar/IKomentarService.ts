import { KomentarDto } from "../../DTOs/komentar/KomentarDto";
import { Komentar } from "../../models/Komentar";

export interface IKomentarService {
  dodajKomentar(noviKomentar: Komentar): Promise<KomentarDto>;
  obrisiKomentar(komentar_id: number): Promise<KomentarDto>;
  prikaziSveKomentareZaBlogPost(blog_post_id: number): Promise<KomentarDto[]>;
}
