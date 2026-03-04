import type { OrderDetailsResponseDto } from "../../models/order/OrderDetailsResponseDto";
import type { OrderResponseDto } from "../../models/order/OrderResponseDto";

export interface IOrderApiService {
    getAllOrders(token: string): Promise<OrderResponseDto[]>;
    getMyOrders(token: string): Promise<OrderResponseDto[]>;
    getOrderById(token: string, orderId: number): Promise<OrderResponseDto>;
    getFullDetails(orderId: number, token: string): Promise<OrderDetailsResponseDto>;
    deleteOrder(token: string, orderId: number): Promise<boolean>;
}