import { UserRole } from "../../enums/UserRole";

export class UserDto {
  public constructor(
    public userId: number = 0,
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public username: string = "",
    public role?: UserRole
  ) {}
}
