import { Order } from "../../models/Order";
import { OrderItem } from "../../models/OrderItem";

export interface OrderDetailsDto {
  order: Order;
  items: OrderItem[];
}