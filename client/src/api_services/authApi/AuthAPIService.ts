import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { IAuthAPIService } from "./IAuthAPIService";
import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/login`, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      let message = "Error while logging in";
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

  async registration(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    userRole: string
  ): Promise<AuthResponse> {
    try {
      const res = await axios.post<AuthResponse>(`${API_URL}/registration`, {
        firstName,
        lastName,
        email,
        username,
        password,
        userRole
      });
      return res.data;
    } catch (error) {
      let message = "Error while signing up.";
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
