import { PoolConnection } from "mysql2/promise";
import { Order } from "../models/Order";
import { OrderItem } from "../models/OrderItem";

export interface IOrderRepository {
  create(order: Order, connection?: PoolConnection): Promise<Order>;
  addOrderItem(
    orderItem: OrderItem,
    connection?: PoolConnection,
  ): Promise<boolean>;
  getById(orderId: number): Promise<Order | null>;
  getByUserId(userId: number): Promise<Order[]>;
  updateStatus(orderId: number, status: string): Promise<boolean>;
  getAll(): Promise<Order[]>;
  delete(orderId: number): Promise<boolean>;
  exists(orderId: number): Promise<boolean>;
  updateTotalPrice(
    orderId: number,
    total: number,
    connection?: PoolConnection,
  ): Promise<boolean>;
}
