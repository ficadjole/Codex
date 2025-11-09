import { TipArtikla } from "../enums/TipArtikla";
import { Artikal } from "./Artikal";
import { Kategorija } from "./Kategorija";

export class Knjiga extends Artikal {
  public constructor(
    public artikal_id: number = 0,
    public naziv: string = "",
    public cena: number = 0,
    public slika_url: string = "",
    public korisnik_id: number = 0,
    public isbn: string = "",
    public autor: string = "",
    public broj_strana: number = 0,
    public korice: "meke" | "tvrde" = "meke",
    public godina_izdanja: number = 0,
    public opis: string = "",
    public goodreads_link = "",
    public kategorije?: Kategorija[] //ovo su nam kategorije (zanrovi) knjige koji ce se prolsedjivati zajedno sa njom
  ) {
    super(
      artikal_id,
      naziv,
      cena,
      slika_url,
      TipArtikla.knjiga,
      korisnik_id,
      new Date(1944, 6, 6, 0, 0, 0, 0)
    );
  }
}
