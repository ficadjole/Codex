import { CreateOrderDto } from "../../Domain/DTOs/order/CreateOrderDto";
import { Item } from "../../Domain/models/Item";
import { Order } from "../../Domain/models/Order";
import { OrderCreatedEvent } from "./OrderCreatedEvent";

export function MapToOrderCreatedEvent(
  createdOrder: Order,
  dto: CreateOrderDto,
  orderItems: Item[],
  total: number,
) {
  const eventPayload: OrderCreatedEvent = {
    orderId: createdOrder.orderId ?? 0,
    firstname: createdOrder.firstname,
    lastname: createdOrder.lastname,
    email: createdOrder.email,
    telephone: createdOrder.telephone ?? "",
    city: createdOrder.city,
    street: createdOrder.streat,
    streetNumber: createdOrder.streatNumber ?? "",
    postalCode: createdOrder.postalCode ?? "",
    note: createdOrder.note,
    totalPrice: total,

    items: dto.items.map((i) => {
      const dbItem = orderItems.find((x) => x.itemId === i.itemId)!;

      return {
        itemId: dbItem.itemId!,
        name: dbItem.name,
        price: dbItem.price,
        quantity: i.quantity,
      };
    }),
  };

  return eventPayload;
}
