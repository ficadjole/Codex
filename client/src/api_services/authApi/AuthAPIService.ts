import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { IAuthAPIService } from "./IAuthAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {
  async prijava(korisnickoIme: string, password: string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/prijava`, {
        korisnickoIme,
        password,
      });
      return res.data;
    } catch (error) {
      let message = "Greška prilikom prijave.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
        data: undefined,
      };
    }
  },

  async registracija(
    ime: string,
    prezime: string,
    email: string,
    korisnickoIme: string,
    password: string,
    uloga: string
  ): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/registracija`, {
        ime,
        prezime,
        email,
        korisnickoIme,
        password,
        uloga
      });
      return res.data;
    } catch (error) {
      let message = "Greška prilikom registracije.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return {
        success: false,
        message,
        data: undefined,
      };
    }
  },
};
