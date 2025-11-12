import { AksesoarDetaljiDto } from "../../Domain/DTOs/artikal/AksesoarDetaljiDto";
import { ArtikalDto } from "../../Domain/DTOs/artikal/ArtikalDto";
import { KnjigaDetaljiDto } from "../../Domain/DTOs/artikal/KnjigaDetaljiDto";
import { TipArtikla } from "../../Domain/enums/TipArtikla";
import { Aksesoar } from "../../Domain/models/Aksesoar";
import { Artikal } from "../../Domain/models/Artikal";
import { Knjiga } from "../../Domain/models/Knjiga";
import { IAksesoarRepository } from "../../Domain/repositories/IAksesoarRepository";
import { IArtikalRepository } from "../../Domain/repositories/IArtikalRepository";
import { IKategorijaRepository } from "../../Domain/repositories/IKategorijaRepository";
import { IKnjigaKategorijaRepository } from "../../Domain/repositories/IKnjigaKategorijaRepository";
import { IKnjigaRepository } from "../../Domain/repositories/IKnjigaRepository";
import { IArtikalService } from "../../Domain/services/artikal/IArtikalService";

export class ArtikalService implements IArtikalService {
  public constructor(
    private artikalRepository: IArtikalRepository,
    private knjigaRepository: IKnjigaRepository,
    private kategorijaRepository: IKategorijaRepository,
    private knjigaKategorijaRepository: IKnjigaKategorijaRepository,
    private aksesoarRepository: IAksesoarRepository
  ) {}

  async dodajArtikal(artikal: Artikal): Promise<ArtikalDto> {
    //dodajemo osnovni artikal

    const noviArtikal = await this.artikalRepository.dodajArtikal(artikal);

    if (noviArtikal.artikal_id === 0) {
      //nije uspelo dodavanje artikla
      return new ArtikalDto();
    }

    //dodajemo detalje u zavisnosti od tipa artikla

    switch (artikal.tip) {
      case TipArtikla.knjiga:
        const novaKnjiga = {
          ...(artikal as Knjiga),
          artikal_id: noviArtikal.artikal_id,
        };

        const uspesnoDodata = await this.knjigaRepository.dodajKnjigu(
          novaKnjiga
        );

        if (uspesnoDodata.artikal_id === 0) {
          //nije uspelo dodavanje knjige
          return new ArtikalDto();
        }

        if (novaKnjiga.kategorije && novaKnjiga.kategorije.length > 0) {
          for (const kategorija of novaKnjiga.kategorije) {
            //foreach
            let postojecaKategorija =
              await this.kategorijaRepository.getByKategorijaID(
                kategorija.kategorija_id
              );
            if (postojecaKategorija.kategorija_id !== 0) {
              const uspesnoDodataKnjigaKategorija =
                await this.knjigaKategorijaRepository.dodajKnjigaKategorija(
                  novaKnjiga.artikal_id,
                  postojecaKategorija.kategorija_id
                );

              if (uspesnoDodataKnjigaKategorija.kategorija_id === 0) {
                //nije uspelo dodavanje veze knjiga-kategorija
                return new ArtikalDto();
              }
            } else {
              return new ArtikalDto(); //za sad ne dozvoljavamo dodavanje novih kategorija kroz ovaj endpoint
            }
          }
        }
        break;
      case TipArtikla.aksesoar:
        const uspesnoDodatAksesoar =
          await this.aksesoarRepository.dodajAksesoar({
            ...(artikal as Aksesoar),
            artikal_id: noviArtikal.artikal_id,
          });

        if (uspesnoDodatAksesoar.artikal_id === 0) {
          //nije uspelo dodavanje aksesoara
          return new ArtikalDto();
        }
        break;
    }

    //ako smo stigli dovde, sve je proslo ok
    return new ArtikalDto(
      noviArtikal.artikal_id,
      noviArtikal.naziv,
      noviArtikal.cena,
      noviArtikal.slika_url,
      noviArtikal.tip,
      noviArtikal.datumKreiranja
    );
  }

  async azurirajArtikal(artikal: Artikal): Promise<ArtikalDto> {
    const postojeciArtikal = await this.artikalRepository.getByArtikalId(
      artikal.artikal_id
    );

    if (postojeciArtikal.artikal_id === 0) {
      return new ArtikalDto();
    }

    const azuriraniArtikal = await this.artikalRepository.azurirajArtikal(
      artikal
    );

    if (azuriraniArtikal.artikal_id === 0) {
      return new ArtikalDto();
    }

    switch (artikal.tip) {
      case TipArtikla.knjiga:
        const azuriranaKnjiga = await this.knjigaRepository.azurirajKnjigu(
          artikal as Knjiga
        );


        if(azuriranaKnjiga.kategorije && azuriranaKnjiga.kategorije.length > 0){
          //prvo brisemo sve postojece kategorije za tu knjigu
          await this.knjigaKategorijaRepository.obrisiKategorijeZaKnjigu(azuriranaKnjiga.artikal_id);
          //pa dodajemo nove
          for (const kategorija of azuriranaKnjiga.kategorije) {
            let postojecaKategorija =
              await this.kategorijaRepository.getByKategorijaID(
                kategorija.kategorija_id
              );
            if (postojecaKategorija.kategorija_id !== 0) {
              const uspesnoDodataKnjigaKategorija =
                await this.knjigaKategorijaRepository.dodajKnjigaKategorija(
                  azuriranaKnjiga.artikal_id,
                  postojecaKategorija.kategorija_id
                );  
              if (uspesnoDodataKnjigaKategorija.kategorija_id === 0) {
                //nije uspelo dodavanje veze knjiga-kategorija
                return new ArtikalDto();
              }   
            } else {
              return new ArtikalDto(); //za sad ne dozvoljavamo dodavanje novih kategorija kroz ovaj endpoint
            }
          }
        }

        if (azuriranaKnjiga.artikal_id === 0) {
          return new ArtikalDto();
        }
        break;
      case TipArtikla.aksesoar:
        const azuriraniAksesoar =
          await this.aksesoarRepository.azurirajAksesoar(artikal as Aksesoar);
        if (azuriraniAksesoar.artikal_id === 0) {
          return new ArtikalDto();
        }
        break;
    }

    return new ArtikalDto(
      azuriraniArtikal.artikal_id,
      azuriraniArtikal.naziv,
      azuriraniArtikal.cena,
      azuriraniArtikal.slika_url,
      azuriraniArtikal.tip,
      azuriraniArtikal.datumKreiranja
    );
  }

  async obrisiArtikal(artikalId: number): Promise<boolean> {
    const postojeciArtikal = await this.artikalRepository.getByArtikalId(
      artikalId
    );

    if (postojeciArtikal.artikal_id === 0) {
      return false;
    }

    const uspesnoObrisan = await this.artikalRepository.obrisiArtikal(
      artikalId
    );

    return uspesnoObrisan;
  }
  async getArtikalById(artikalId: number): Promise<ArtikalDto> {
    const artikal = await this.artikalRepository.getByArtikalId(artikalId);

    if (artikal.artikal_id === 0) {
      return new ArtikalDto();
    }

    return new ArtikalDto(
      artikal.artikal_id,
      artikal.naziv,
      artikal.cena,
      artikal.slika_url,
      artikal.tip,
      artikal.datumKreiranja
    );
  }
  async getAllArtikli(): Promise<ArtikalDto[]> {
    const artikli = await this.artikalRepository.getAll();

    return artikli.map((artikal) => {
      return new ArtikalDto(
        artikal.artikal_id,
        artikal.naziv,
        artikal.cena,
        artikal.slika_url,
        artikal.tip,
        artikal.datumKreiranja
      );
    });
  }
  async getArtikliByTip(tip: TipArtikla): Promise<ArtikalDto[]> {
    const artikli = await this.artikalRepository.getByTipArtikla(tip);

    return artikli.map((artikal) => {
      return new ArtikalDto(
        artikal.artikal_id,
        artikal.naziv,
        artikal.cena,
        artikal.slika_url,
        artikal.tip,
        artikal.datumKreiranja
      );
    });
  }
  async getKnjiga(artikalId: number): Promise<KnjigaDetaljiDto> {
    const knjiga = await this.knjigaRepository.getByKnjigaID(artikalId);

    if (knjiga.artikal_id === 0) {
      return new KnjigaDetaljiDto();
    }

    //dohvatimo kategorije knjige

    const knjigaKategorije =
      await this.knjigaKategorijaRepository.getByKnjigaId(artikalId);

    const kategorijeDto = await Promise.all(
      knjigaKategorije.map(async (kk) => {
        const kategorija = await this.kategorijaRepository.getByKategorijaID(
          kk.kategorija_id
        );
        return {
          kategorija_id: kategorija.kategorija_id,
          naziv: kategorija.naziv,
        };
      })
    );

    return new KnjigaDetaljiDto(
      knjiga.artikal_id,
      knjiga.naziv,
      knjiga.cena,
      knjiga.slika_url,
      knjiga.autor,
      knjiga.isbn,
      knjiga.broj_strana,
      knjiga.opis,
      knjiga.goodreads_link,
      new Date(knjiga.godina_izdanja, 0, 1),
      kategorijeDto
    );
  }
  async getAksesoar(artikalId: number): Promise<AksesoarDetaljiDto> {
    const aksesoar = await this.aksesoarRepository.getByAksesoarID(artikalId);
    if (aksesoar.artikal_id === 0) {
      return new AksesoarDetaljiDto();
    }

    return new AksesoarDetaljiDto(
      aksesoar.artikal_id,
      aksesoar.naziv,
      aksesoar.cena,
      aksesoar.slika_url,
      aksesoar.opis,
      aksesoar.sadrzaj
    );
  }
}
