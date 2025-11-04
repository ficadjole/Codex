import { ArtikalDto } from "../../DTOs/artikal/ArtikalDto";
import { TipArtikla } from "../../enums/TipArtikla";
import { Artikal } from "../../models/Artikal";

export interface IArtikalService {
  dodajArtikal(
    naziv: string,
    cena: number,
    slika_url: string,
    tip: TipArtikla,
    korisnik_id: number
  ): Promise<ArtikalDto>;

  azurirajArtikal(artikal: Artikal): Promise<ArtikalDto>;
}
