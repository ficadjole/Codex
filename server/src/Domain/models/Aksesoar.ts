import { TipArtikla } from "../enums/TipArtikla";
import { Artikal } from "./Artikal";

export class Aksesoar extends Artikal {
  public constructor(
    public artikal_id: number = 0,
    public naziv: string = "",
    public cena: number = 0,
    public slika_url: string = "",
    public korisnik_id: number = 0,
    public opis: string = "",
    public sadrzaj: string = ""
  ) {
    super(
      artikal_id,
      naziv,
      cena,
      slika_url,
      TipArtikla.aksesoar,
      korisnik_id,
      new Date(1944, 6, 6, 0, 0, 0, 0)
    );
  }
}
