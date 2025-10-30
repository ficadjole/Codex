import { Uloga } from "../enums/Uloga";

export class Korisnik {
  public constructor(
    public korisnik_id: number = 0,
    public ime: string = "",
    public prezime: string = "",
    public email: string = "",
    public korisnicko_ime: string = "",
    public lozinka_hash: string = "",
    public uloga: Uloga = Uloga.kupac,
    public date: Date = new Date(1944, 6, 6, 0, 0, 0, 0)
  ) {}
}
