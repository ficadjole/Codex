import { AksesoarDetaljiDto } from "../../DTOs/artikal/AksesoarDetaljiDto";
import { ArtikalDto } from "../../DTOs/artikal/ArtikalDto";
import { KnjigaDetaljiDto } from "../../DTOs/artikal/KnjigaDetaljiDto";
import { TipArtikla } from "../../enums/ItemType";
import { Artikal } from "../../models/Item";

export interface IArtikalService {
  dodajArtikal(artikal: Artikal): Promise<ArtikalDto>;
  azurirajArtikal(artikal: Artikal): Promise<ArtikalDto>;
  obrisiArtikal(artikalId: number): Promise<boolean>;
  getArtikalById(artikalId: number): Promise<ArtikalDto>;

  getAllArtikli(): Promise<ArtikalDto[]>;
  getArtikliByTip(tip: TipArtikla): Promise<ArtikalDto[]>;

  getKnjiga(artikalId: number): Promise<KnjigaDetaljiDto>;
  getAksesoar(artikalId: number): Promise<AksesoarDetaljiDto>;
}
