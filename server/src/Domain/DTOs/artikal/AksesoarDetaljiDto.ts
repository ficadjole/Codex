export class AksesoarDetaljiDto {
  public constructor(
    public artikal_id: number = 0,
    public naziv: string = "",
    public cena: number = 0,
    public slika_url: string = "",
    public opis: string = "",
    public sadrzaj: string = ""
  ) {}
}
