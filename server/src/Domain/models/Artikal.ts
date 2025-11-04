import { TipArtikla } from "../enums/TipArtikla";

export class Artikal {
  public constructor(
    public artikal_id: number = 0,
    public naziv: string = "",
    public cena: number = 0,
    public slika_url: string = "",
    public tip: TipArtikla = TipArtikla.knjiga,
    public korisnik_id: number = 0,
    public datumKreiranja?: Date
  ) {}
}
