import { KorisnikDto } from "../../DTOs/korisnik/KorisnikDto";
import { Korisnik } from "../../models/Korisnik";

export interface IUserService {
  azurirajPodatkeKorisnika(korisnik: Korisnik): Promise<KorisnikDto>;
}
