import { KorisnikDto } from "../../DTOs/korisnik/KorisnikDto";
import { Korisnik } from "../../models/User";

export interface IUserService {
  azurirajPodatkeKorisnika(korisnik: Korisnik): Promise<KorisnikDto>;
}
