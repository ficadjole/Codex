import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IOrderRepository } from "../../../Domain/repositories/IOrderRepository";
import { Order } from "../../../Domain/models/Order";
import db from "../../connection/DbConnectionPool";
import { OrderItem } from "../../../Domain/models/OrderItem";
import { PoolConnection } from "mysql2/promise";

export class OrderRepository implements IOrderRepository {
  async create(order: Order, connection?: PoolConnection): Promise<Order> {
    try {
      const query = `
        INSERT INTO orders 
        (userId, orderDate, orderStatus, totalPrice, firstname, lastname, email, telephone, city, streat, streatNumber, postalCode, note)
        VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const executor = connection ?? db;

      const [result] = await executor.execute<ResultSetHeader>(query, [
        order.userId,
        order.orderStatus,
        order.totalPrice,
        order.firstname,
        order.lastname,
        order.email,
        order.telephone,
        order.city,
        order.streat,
        order.streatNumber,
        order.postalCode,
        order.note,
      ]);

      if (result.insertId) {
        return new Order(
          result.insertId,
          order.userId,
          new Date(),
          order.orderStatus,
          order.totalPrice,
          order.firstname,
          order.lastname,
          order.email,
          order.telephone,
          order.city,
          order.streat,
          order.streatNumber,
          order.postalCode,
          order.note,
        );
      } else {
        return new Order();
      }
    } catch (error) {
      return new Order();
    }
  }

  async getById(orderId: number): Promise<Order> {
    try {
      const query = "SELECT * FROM orders WHERE orderId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [orderId]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Order(
          row.orderId,
          row.userId,
          row.orderDate,
          row.orderStatus,
          row.totalPrice,
          row.firstname,
          row.lastname,
          row.email,
          row.telephone,
          row.city,
          row.streat,
          row.streatNumber,
          row.postalCode,
          row.note,
        );
      } else {
        return new Order();
      }
    } catch {
      return new Order();
    }
  }

  async getByUserId(userId: number): Promise<Order[]> {
    try {
      const query =
        "SELECT * FROM orders WHERE userId = ? ORDER BY orderDate DESC";

      const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

      return rows.map(
        (row) =>
          new Order(
            row.orderId,
            row.userId,
            row.orderDate,
            row.orderStatus,
            row.totalPrice,
            row.firstname,
            row.lastname,
            row.email,
            row.telephone,
            row.city,
            row.streat,
            row.streatNumber,
            row.postalCode,
            row.note,
          ),
      );
    } catch {
      return [];
    }
  }

  async getAll(): Promise<Order[]> {
    try {
      const query = "SELECT * FROM orders ORDER BY orderDate DESC";

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new Order(
            row.orderId,
            row.userId,
            row.orderDate,
            row.orderStatus,
            row.totalPrice,
            row.firstname,
            row.lastname,
            row.email,
            row.telephone,
            row.city,
            row.streat,
            row.streatNumber,
            row.postalCode,
            row.note,
          ),
      );
    } catch {
      return [];
    }
  }

  async updateStatus(orderId: number, status: string): Promise<boolean> {
    try {
      const query = "UPDATE orders SET orderStatus = ? WHERE orderId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        status,
        orderId,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async updateTotalPrice(
    orderId: number,
    total: number,
    connection?: PoolConnection,
  ): Promise<boolean> {
    try {
      const query = "UPDATE orders SET totalPrice = ? WHERE orderId = ?";

      const executor = connection ?? db;

      const [result] = await executor.execute<ResultSetHeader>(query, [
        total,
        orderId,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async delete(orderId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM orders WHERE orderId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [orderId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async exists(orderId: number): Promise<boolean> {
    try {
      const query = "SELECT COUNT(*) as count FROM orders WHERE orderId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [orderId]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }

  // ========================
  // ORDER ITEMS
  // ========================

  async addOrderItem(
    orderItem: OrderItem,
    connection?: PoolConnection,
  ): Promise<boolean> {
    try {
      const query = `
        INSERT INTO orderItems 
        (orderId, itemId, quantity, price, discountPercent)
        VALUES (?, ?, ?, ?, ?)
      `;

      const executor = connection ?? db;
      const [result] = await executor.execute<ResultSetHeader>(query, [
        orderItem.orderId,
        orderItem.itemId,
        orderItem.quantity,
        orderItem.price,
        orderItem.discountPercent,
      ]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    try {
      const query = "SELECT * FROM orderItems WHERE orderId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [orderId]);

      return rows.map(
        (row) =>
          new OrderItem(
            row.orderId,
            row.itemId,
            row.quantity,
            row.price,
            row.discountPercent,
          ),
      );
    } catch {
      return [];
    }
  }
}
