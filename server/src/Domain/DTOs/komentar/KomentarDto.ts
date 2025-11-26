export class KomentarDto {
  public constructor(
    public komentar_id: number = 0,
    public tekst: string = "",
    public datum_komenatara: Date = new Date(),
    public autor?: {
      korisnik_id: number;
      korisnicko_ime: string;
    }
  ) {}
}
