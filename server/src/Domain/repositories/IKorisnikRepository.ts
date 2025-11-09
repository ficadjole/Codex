import { Korisnik } from "../models/Korisnik";


export interface IKorisnikRepository {
  create(korisnik: Korisnik): Promise<Korisnik>;
  getById(korisnik_id: number): Promise<Korisnik>;
  getByKorisnickoIme(korisnicko_ime: string): Promise<Korisnik>;
  getByEmail(email: string): Promise<Korisnik>;
  getAll(): Promise<Korisnik[]>;
  update(korisnik: Korisnik): Promise<Korisnik>;
  delete(korisnik_id: number): Promise<boolean>;
  exists(korisnik_id: number): Promise<boolean>;
}
