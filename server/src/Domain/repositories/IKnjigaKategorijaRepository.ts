import { KnjigaKategorija } from "../models/KnjigaKategorija";

export interface IKnjigaKategorijaRepository {
  dodajKnjigaKategorija(
    knjiga_id: number,
    kategorija_id: number
  ): Promise<KnjigaKategorija>;
  obrisiKnjigaKategorija(
    knjiga_id: number,
    kategorija_id: number
  ): Promise<boolean>;
  azurirajKnjigaKategorija(
    knjigaKategorija: KnjigaKategorija,
    id_nove_kategorije: number
  ): Promise<KnjigaKategorija>;
  getByKnjigaId(knjiga_id: number): Promise<KnjigaKategorija[]>;
  getByKategorijaId(kategorija_id: number): Promise<KnjigaKategorija[]>;
}
