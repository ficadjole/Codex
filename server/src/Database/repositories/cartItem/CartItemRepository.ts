import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ICartItemRepository } from "../../../Domain/repositories/ICartItemRepository";
import db from "../../connection/DbConnectionPool";
import { CartItem } from "../../../Domain/models/CartItem";
import { CartDetails } from "../../../Domain/DTOs/cart/CartDetails";

export class CartItemRepository implements ICartItemRepository {
  async addItem(
    cartId: number,
    itemId: number,
    quantity: number = 1,
  ): Promise<boolean> {
    try {
      const query = `
        INSERT INTO cartItem (cartId, itemId, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        cartId,
        itemId,
        quantity,
        quantity,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getByCartId(cartId: number): Promise<CartItem[]> {
    try {
      const query = "SELECT * FROM cartItem WHERE cartId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [cartId]);

      return rows.map(
        (row) =>
          new CartItem(row.cartItemId, row.cartId, row.itemId, row.quantity),
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateQuantity(
    cartId: number,
    itemId: number,
    quantity: number,
  ): Promise<boolean> {
    try {
      const query =
        "UPDATE cartItem SET quantity = ? WHERE cartId = ? AND itemId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        quantity,
        cartId,
        itemId,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async removeItem(cartId: number, itemId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM cartItem WHERE cartId = ? AND itemId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        cartId,
        itemId,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async clearCart(cartId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM cartItem WHERE cartId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [cartId]);

      return result.affectedRows >= 0;
    } catch {
      return false;
    }
  }

  async getCartDetails(userId: number): Promise<CartDetails[]> {
    try {
      const query = `
      SELECT 
        ci.cartItemId,
        ci.quantity,
        i.itemId,
        i.itemName,
        i.price,
        img.imageUrl
      FROM cart c
      JOIN cartItem ci ON c.cartId = ci.cartId
      JOIN items i ON ci.itemId = i.itemId
      LEFT JOIN itemImages img 
        ON i.itemId = img.itemId AND img.isPrimary = TRUE
      WHERE c.userId = ?
    `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

      return rows.map(
        (row) =>
          new CartDetails(
            row.cartItemId,
            row.itemId,
            row.itemName,
            row.price,
            row.quantity,
            row.imageUrl,
          ),
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getCartItemCount(userId: number): Promise<number> {
    try {
      const query = `
      SELECT 
        SUM(ci.quantity) AS totalItems
      FROM cart c
      JOIN cartItem ci ON c.cartId = ci.cartId
      WHERE c.userId = ?
    `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

      return rows[0].totalItems || 0;
    } catch {
      return 0;
    }
  }
}
