import { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import db from "../connection/DbConnectionPool";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const query =
        "INSERT INTO users (firstname,surname,email,username,passwordHash,userRole) VALUES (?,?,?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.passwordHash,
        user.userRole,
      ]);

      if (result.insertId) {
        return new User(
          result.insertId,
          user.firstName,
          user.lastName,
          user.email,
          user.username,
          user.passwordHash,
          user.userRole,
          new Date()
        );
      } else {
        return new User();
      }
    } catch {
      return new User();
    }
  }
  async getById(userId: number): Promise<User> {
    try {
      const query = "SELECT * FROM users WHERE userId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

      if (rows.length > 0) {
        const row = rows[0];

        return new User(
          row.userId,
          row.firstName,
          row.lastName,
          row.email,
          row.username,
          row.passwordHash,
          row.userRole
        );
      } else {
        return new User();
      }
    } catch {
      return new User();
    }
  }
  async getByUsername(username: string): Promise<User> {
    try {
      const query = "SELECT * FROM users WHERE username = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [username]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(
          row.userId,
          row.firstName,
          row.lastName,
          row.email,
          row.username,
          row.passwordHash,
          row.userRole
        );
      } else {
        return new User();
      }
    } catch {
      return new User();
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const query = "SELECT * FROM users WHERE email = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

      if (rows.length > 0) {
        const row = rows[0];

        return new User(
          row.userId,
          row.firstName,
          row.lastName,
          row.email,
          row.username,
          row.passwordHash,
          row.userRole
        );
      } else {
        return new User();
      }
    } catch {
      return new User();
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const query = "SELECT * FROM users";

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new User(
            row.userId,
            row.firstName,
            row.lastName,
            row.email,
            row.username,
            row.passwordHash,
            row.userRole
          )
      );
    } catch {
      return [];
    }
  }
  async update(user: User): Promise<User> {
    try {
      const query =
        "UPDATE korisnik SET ime = ?, prezime = ?, email = ?, korisnicko_ime = ? WHERE korisnik_id = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userId,
      ]);

      if (result.affectedRows > 0) {
        return user;
      } else {
        return new User();
      }
    } catch {
      return new User();
    }
  }
  async delete(userId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM users WHERE userId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [userId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async exists(userId: number): Promise<boolean> {
    try {
      const query = "SELECT COUNT(*) as count FROM users WHERE userId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}