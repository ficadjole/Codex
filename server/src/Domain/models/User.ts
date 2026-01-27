import { UserRole } from "../enums/UserRole";

export class User {
  public constructor(
    public userId: number = 0,
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public username: string = "",
    public passwordHash: string = "",
    public userRole: UserRole = UserRole.USER,
    public dateCreated: Date = new Date(1944, 6, 6, 0, 0, 0, 0)
  ) {}
}