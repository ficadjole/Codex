import { Knjiga } from "../models/Knjiga";


export interface IKnjigaRepository {
  dodajKnjigu(knjiga: Knjiga): Promise<Knjiga>;
  azurirajKnjigu(knjiga: Knjiga): Promise<Knjiga>;
  obrisiKnjigu(artikal_id: number): Promise<boolean>;
  getByKnjigaID(artikal_id: number): Promise<Knjiga>;
  getByAutor(autor: string): Promise<Knjiga[]>;
}
