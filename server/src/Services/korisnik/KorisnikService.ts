import { KorisnikDto } from "../../Domain/DTOs/korisnik/KorisnikDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IUserService } from "../../Domain/services/user/IUserService";

export class KorisnikService implements IUserService {
  public constructor(private korisnikRepository: IUserRepository) {}

  async azurirajPodatkeKorisnika(korisnik: User): Promise<KorisnikDto> {
    try {
      const azuriranKorisnik = await this.korisnikRepository.update(korisnik);

      if (azuriranKorisnik.userId === 0) {
        return new KorisnikDto();
      }

      return new KorisnikDto(
        azuriranKorisnik.userId,
        azuriranKorisnik.firstName,
        azuriranKorisnik.lastName,
        azuriranKorisnik.email,
        azuriranKorisnik.username,
        azuriranKorisnik.userRole
      );
    } catch {
      return new KorisnikDto();
    }
  }
}
