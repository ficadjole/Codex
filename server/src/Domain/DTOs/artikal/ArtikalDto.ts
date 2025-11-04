import { TipArtikla } from "../../enums/TipArtikla";

export class ArtikalDto {
  public constructor(
    public artikal_id: number = 0,
    public naziv: string = "",
    public cena: number = 0,
    public slika_url: string = "",
    public tip?: TipArtikla,
    public datum_kreiranja: Date = new Date()
  ) {}
}
