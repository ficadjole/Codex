import type { AuthResponse } from "../../types/auth/AuthResponse";

export interface IAuthAPIService {
  login(username: string, password: string): Promise<AuthResponse>;
  registration(firstName: string, lastName: string, username: string, email: string, password: string, userRole: string): Promise<AuthResponse>;
}