export class Komentar {
  public constructor(
    public komentar_id: number = 0,
    public blog_post_id: number = 0,
    public korisnik_id: number = 0,
    public tekst: string = "",
    public datum_komentara: Date = new Date(1944, 6, 6, 0, 0, 0, 0)
  ) {}
}
