import { UserRole } from "../../enums/UserRole";

export class LoginDto {
  public constructor(
    public userId: number = 0,
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public username: string = "",
    public userRole: UserRole = UserRole.USER
  ) {}
}
