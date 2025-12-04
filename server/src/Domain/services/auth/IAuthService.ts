import { LoginDto } from "../../DTOs/auth/LoginDto";
import { UserRole } from "../../enums/UserRole";

export interface IAuthService {
  login(username: string, password: string): Promise<LoginDto>;

  registration(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    userRole: UserRole
  ): Promise<LoginDto>;
}
