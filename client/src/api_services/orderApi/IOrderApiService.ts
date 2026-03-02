import type { OrderResponseDto } from "../../models/order/OrderResponseDto";

export interface IOrderApiService {
  getAllOrders(token:string): Promise<OrderResponseDto[]>;
  getMyOrders(token:string): Promise<OrderResponseDto[]>;
  getOrderById(orderId: number): Promise<OrderResponseDto>;
  deleteOrder(orderId: number): Promise<boolean>;
}