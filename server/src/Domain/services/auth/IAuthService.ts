import { KorisnikLoginDto } from "../../DTOs/auth/KorisnikLoginDto";
import { Uloga } from "../../enums/Uloga";

export interface IAuthService {
  prijava(
    korisnicko_ime: string,
    passwordHash: string
  ): Promise<KorisnikLoginDto>;

  registracija(
    ime: string,
    prezime: string,
    email: string,
    korisnicko_ime: string,
    password: string,
    uloga: Uloga
  ): Promise<KorisnikLoginDto>;
}
