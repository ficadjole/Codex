import { LoginDto } from "../../Domain/DTOs/auth/LoginDto";
import { UserRole } from "../../Domain/enums/UserRole";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(
    process.env.SALT_ROUNDS || "10",
    10
  );

  public constructor(private userRepository: IUserRepository) {}

  async login(username: string, password: string): Promise<LoginDto> {
    const user = await this.userRepository.getByUsername(username);

    if (
      user.userId !== 0 &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      return new LoginDto(
        user.userId,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userRole
      );
    } else {
      return new LoginDto();
    }
  }

  async registration(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    userRole: UserRole
  ): Promise<LoginDto> {
    //proveravamo korisnicko ime da li postoji
    const existingUserUsername = await this.userRepository.getByUsername(
      username
    );

    if (existingUserUsername.userId !== 0) return new LoginDto();

    //proveravamo da li postoji vec nalog sa datim emailom
    const existingUserEmail = await this.userRepository.getByEmail(email);

    if (existingUserEmail.userId !== 0) return new LoginDto();

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const newUser = await this.userRepository.create(
      new User(
        0,
        firstName,
        lastName,
        email,
        username,
        hashedPassword,
        userRole
      )
    );

    if (newUser.userId !== 0) {
      return new LoginDto(
        newUser.userId,
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.username,
        newUser.userRole
      );
    } else {
      return new LoginDto();
    }
  }
}
