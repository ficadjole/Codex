import { TipArtikla } from "../enums/TipArtikla";
import { Artikal } from "../models/Artikal";


export interface IArtikalRepository {
  dodajArtikal(artikal: Artikal): Promise<Artikal>;
  azurirajArtikal(artikal: Artikal): Promise<Artikal>;
  obrisiArtikal(artikal_id: number): Promise<boolean>;
  getByNazivArtikla(naziv: string): Promise<Artikal>;
  getByArtikalId(artikal_id: number): Promise<Artikal>;
  getByTipArtikla(tip: TipArtikla): Promise<Artikal[]>;
  getAll(): Promise<Artikal[]>;
}
