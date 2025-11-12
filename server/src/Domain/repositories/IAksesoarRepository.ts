import { Aksesoar } from "../models/Aksesoar";

export interface IAksesoarRepository {
  dodajAksesoar(aksesoar: Aksesoar): Promise<Aksesoar>;
  azurirajAksesoar(aksesoar: Aksesoar): Promise<Aksesoar>;
  // obrisiAksesoar(artikal_id: number): Promise<boolean>;
  getByAksesoarID(artikal_id: number): Promise<Aksesoar>;
}
