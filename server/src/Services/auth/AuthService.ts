import { KorisnikLoginDto } from "../../Domain/DTOs/auth/KorisnikLoginDto";
import { Uloga } from "../../Domain/enums/Uloga";
import { Korisnik } from "../../Domain/models/Korisnik";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(
    process.env.SALT_ROUNDS || "10",
    10
  );

  public constructor(private korisnikRepository: IKorisnikRepository) {}

  async prijava(
    korisnicko_ime: string,
    passwordHash: string
  ): Promise<KorisnikLoginDto> {
    const korisnik = await this.korisnikRepository.getByKorisnickoIme(
      korisnicko_ime
    );

    if (
      korisnik.korisnik_id !== 0 &&
      (await bcrypt.compare(passwordHash, korisnik.lozinka_hash))
    ) {
      return new KorisnikLoginDto(
        korisnik.korisnik_id,
        korisnik.ime,
        korisnik.prezime,
        korisnik.email,
        korisnik.korisnicko_ime,
        korisnik.uloga
      );
    } else {
      return new KorisnikLoginDto();
    }
  }

  async registracija(
    ime: string,
    prezime: string,
    email: string,
    korisnicko_ime: string,
    password: string,
    uloga: Uloga
  ): Promise<KorisnikLoginDto> {
    //proveravamo korisnicko ime da li postoji
    const postojeceKorisnickoIme =
      await this.korisnikRepository.getByKorisnickoIme(korisnicko_ime);

    if (postojeceKorisnickoIme.korisnik_id !== 0) return new KorisnikLoginDto();

    //proveravamo da li postoji vec nalog sa datim emailom
    const postojeciEmail = await this.korisnikRepository.getByEmail(email);

    if (postojeciEmail.korisnik_id !== 0) return new KorisnikLoginDto();

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const noviKorisnik = await this.korisnikRepository.create(
      new Korisnik(
        0,
        ime,
        prezime,
        email,
        korisnicko_ime,
        hashedPassword,
        uloga
      )
    );

    if (noviKorisnik.korisnik_id !== 0) {
      return new KorisnikLoginDto(
        noviKorisnik.korisnik_id,
        noviKorisnik.ime,
        noviKorisnik.prezime,
        noviKorisnik.email,
        noviKorisnik.korisnicko_ime,
        noviKorisnik.uloga
      );
    } else {
      return new KorisnikLoginDto();
    }
  }
}
