import { UserDto } from "../../DTOs/user/UserDto";
import { User } from "../../models/User";

export interface IUserService {
  updateUser(user: User): Promise<UserDto>;
  getUserById(userId: number): Promise<UserDto>;
}
