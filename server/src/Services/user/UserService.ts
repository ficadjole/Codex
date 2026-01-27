import { UserDto } from "../../Domain/DTOs/user/UserDto";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IUserService } from "../../Domain/services/user/IUserService";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async updateUser(user: User): Promise<UserDto> {
    try {
      const updatedUser = await this.userRepository.update(user);

      if (updatedUser.userId === 0) {
        return new UserDto();
      }

      return new UserDto(
        updatedUser.userId,
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.email,
        updatedUser.username,
        updatedUser.userRole
      );
    } catch {
      return new UserDto();
    }
  }

  async getUserById(userId: number): Promise<UserDto> {
    try {
      const user = await this.userRepository.getById(userId);
      if (user.userId === 0) return new UserDto();

      return new UserDto(
        user.userId,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userRole
      );
    } catch {
      return new UserDto();
    }
  }

  async getAllUsers(): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.getAll();
      return users.map(
        (user) =>
          new UserDto(
            user.userId,
            user.firstName,
            user.lastName,
            user.email,
            user.username,
            user.userRole
          )
      );
    } catch {
      return [];
    }
  }
}
