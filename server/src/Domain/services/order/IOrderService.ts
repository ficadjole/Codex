import { CreateOrderDto } from "../../DTOs/order/CreateOrderDto";
import { Order } from "../../models/Order";

export interface IOrderService {
    createOrder(userId: number, dto: CreateOrderDto): Promise<Order>;
    getUserOrders(userId: number): Promise<Order[]>;
    getOrderById(orderId: number): Promise<Order | null>;
    changeStatus(orderId: number, status: string): Promise<boolean>;
    getAllOrders(): Promise<Order[]>;
    deleteOrder(orderId: number): Promise<boolean>;
}