import { KorisnikDto } from "../../Domain/DTOs/korisnik/KorisnikDto";
import { Korisnik } from "../../Domain/models/Korisnik";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import { IUserService } from "../../Domain/services/user/IUserService";

export class KorisnikService implements IUserService {
  public constructor(private korisnikRepository: IKorisnikRepository) {}

  async azurirajPodatkeKorisnika(korisnik: Korisnik): Promise<KorisnikDto> {
    try {
      const azuriranKorisnik = await this.korisnikRepository.update(korisnik);

      if (azuriranKorisnik.korisnik_id === 0) {
        return new KorisnikDto();
      }

      return new KorisnikDto(
        azuriranKorisnik.korisnik_id,
        azuriranKorisnik.ime,
        azuriranKorisnik.prezime,
        azuriranKorisnik.email,
        azuriranKorisnik.korisnicko_ime,
        azuriranKorisnik.uloga
      );

    } catch {
      return new KorisnikDto();
    }
  }
}
