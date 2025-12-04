import { User } from "../models/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  getById(userId: number): Promise<User>;
  getByUsername(username: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(userId: number): Promise<boolean>;
  exists(userId: number): Promise<boolean>;
}
