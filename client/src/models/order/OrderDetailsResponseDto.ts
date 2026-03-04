import type { OrderItemDto, OrderResponseDto } from "./OrderResponseDto";

export interface OrderDetailsResponseDto {
  order: OrderResponseDto;
  items: OrderItemDto[];
} export interface CreateOrderItemDto {
  itemId: number;
  quantity: number;
}