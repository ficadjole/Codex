import { Kategorija } from "../models/Kategorija";


export interface IKategorijaRepository {
  dodajKategoriju(naziv: string): Promise<Kategorija>;
  obrisiKategoriju(kategorija_id: number): Promise<boolean>;
  azurirajKategoriju(kategorija: Kategorija): Promise<Kategorija>;
  getByNazivKategorije(naziv: string): Promise<Kategorija>;
  getByKategorijaID(kategorija_id: number): Promise<Kategorija>;
  getAll(): Promise<Kategorija[]>;
}
