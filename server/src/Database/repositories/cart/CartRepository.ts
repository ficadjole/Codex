import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { Cart } from "../../../Domain/models/Cart";
import { ICartRepository } from "../../../Domain/repositories/ICartRepository";

export class CartRepository implements ICartRepository {
  async create(userId: number): Promise<Cart> {
    try {
      const query = "INSERT INTO cart (userId) VALUES (?)";

      const [result] = await db.execute<ResultSetHeader>(query, [userId]);

      if (result.affectedRows > 0) {
        return new Cart(result.insertId, userId);
      } else {
        return new Cart();
      }
    } catch (error) {
      console.log(error);
      return new Cart();
    }
  }

  async getByUserId(userId: number): Promise<Cart> {
    try {
      const query = "SELECT * FROM cart WHERE userId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Cart(row.cartId, row.userId);
      } else {
        return new Cart();
      }
    } catch {
      return new Cart();
    }
  }

  async delete(cartId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM cart WHERE cartId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [cartId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
