import type { AuthResponse } from "../../types/auth/AuthResponse";

export interface IAuthAPIService {
  prijava(korisnickoIme: string, lozinka: string): Promise<AuthResponse>;
  registracija(ime: string, prezime: string, korisnickoIme: string, email: string, password: string, uloga: string): Promise<AuthResponse>;
}