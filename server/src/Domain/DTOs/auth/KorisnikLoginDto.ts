import { Uloga } from "../../enums/Uloga";

export class KorisnikLoginDto {
  public constructor(
    public korisnik_id: number = 0,
    public ime: string = "",
    public prezime: string = "",
    public email: string = "",
    public korisnicko_ime: string = "",
    public uloga: Uloga = Uloga.kupac
  ) {}
}
