import { KategorijaDto } from "../kategorija/KategorijaDto";

export class KnjigaDetaljiDto {
  public constructor(
    public artikal_id: number = 0,
    public naziv: string = "",
    public cena: number = 0,
    public slika_url: string = "",
    public autor: string = "",
    public isbn: string = "",
    public broj_strana: number = 0,
    public opis: string = "",
    public goodreads_link: string = "",
    public datum_izdavanja: Date = new Date(),
    public kategorije: KategorijaDto[] = []
  ) {}
}
