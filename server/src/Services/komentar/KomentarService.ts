import { KomentarDto } from "../../Domain/DTOs/komentar/KomentarDto";
import { Komentar } from "../../Domain/models/Komentar";
import { IKomentarRepository } from "../../Domain/repositories/IKomentarRepository";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IKomentarService } from "../../Domain/services/komentar/IKomentarService";

export class KomentarService implements IKomentarService {
  public constructor(
    private komentarRepository: IKomentarRepository,
    private userRepository: IUserRepository
  ) {}

  async dodajKomentar(noviKomentar: Komentar): Promise<KomentarDto> {
    const noviKom = await this.komentarRepository.dodajKomentar(noviKomentar);

    if (noviKom.komentar_id !== 0) {
      return this.mapToDTO(noviKom);
    } else {
      return new KomentarDto();
    }
  }
  async obrisiKomentar(komentar_id: number): Promise<KomentarDto> {
    const postojeciKomentar = await this.komentarRepository.getByIdKomentara(
      komentar_id
    );

    if (postojeciKomentar.komentar_id === 0) return new KomentarDto();

    const obrisanKom = await this.komentarRepository.obrisiKomentar(
      komentar_id
    );

    if (obrisanKom === true) {
      return this.mapToDTO(postojeciKomentar);
    } else {
      return new KomentarDto();
    }
  }
  async prikaziSveKomentareZaBlogPost(
    blog_post_id: number
  ): Promise<KomentarDto[]> {
    const komentari: Komentar[] =
      await this.komentarRepository.prikaziSveKomentareZaBlogPost(blog_post_id);

    if (komentari.length === 0) return [new KomentarDto()];

    return await Promise.all(komentari.map((kom) => this.mapToDTO(kom)));
  }

  private async mapToDTO(noviKom: Komentar): Promise<KomentarDto> {
    const autor = await this.userRepository.getById(noviKom.korisnik_id);

    return new KomentarDto(
      noviKom.komentar_id,
      noviKom.tekst,
      noviKom.datum_komentara,
      {
        korisnik_id: autor.userId,
        korisnicko_ime: autor.username,
      }
    );
  }
}
