import type { UserDto } from "../../models/users/UserDto";

export interface IUsersApiService {
    updateUser(token: string, userId: number,  user: UserDto): Promise<UserDto>;
    getUserById(token: string, userId: number): Promise<UserDto>;
}