import db from "../../Database/connection/DbConnectionPool";
import { ItemRepository } from "../../Database/repositories/item/ItemRepository";
import { CreateOrderDto } from "../../Domain/DTOs/order/CreateOrderDto";
import { OrderDetailsDto } from "../../Domain/DTOs/order/OrderDetailsDto";
import { OrderStatus } from "../../Domain/enums/OrderStatus";
import { getFinalPrice } from "../../Domain/helpers/DiscountHelpers";
import { Item } from "../../Domain/models/Item";
import { Order } from "../../Domain/models/Order";
import { OrderItem } from "../../Domain/models/OrderItem";
import { IItemRepository } from "../../Domain/repositories/IItemRepository";
import { IOrderRepository } from "../../Domain/repositories/IOrderRepository";
import { IOrderService } from "../../Domain/services/order/IOrderService";
import { eventBus } from "../../Events/EventBus";
import { MapToOrderCreatedEvent } from "../../Events/Payloads/MapToOrderCreatedEvent";

export class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private itemRepository: IItemRepository,
  ) {}

  async createOrder(userId: number, dto: CreateOrderDto): Promise<Order> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const order = new Order(
        null,
        userId,
        new Date(),
        OrderStatus.NA_CEKANJU,
        0,
        dto.firstname,
        dto.lastname,
        dto.email,
        dto.telephone,
        dto.city,
        dto.streat,
        dto.streatNumber,
        dto.postalCode,
        dto.note || null,
      );
      const createdOrder = await this.orderRepository.create(order);

      if (!createdOrder.orderId) {
        throw new Error("Order creation failed");
      }

      let total = 0;

      let orderItems: Item[] = [];

      //dodajemo stavke porudzbine
      for (const item of dto.items) {
        const dbItem = await this.itemRepository.getById(item.itemId);

        if (!dbItem || dbItem.itemId === null) {
          throw new Error("Item does not exist");
        }

        dbItem.price = getFinalPrice(dbItem);

        const price = dbItem.price;

        total += price * item.quantity;

        const success = await this.orderRepository.addOrderItem(
          new OrderItem(
            createdOrder.orderId,
            item.itemId,
            item.quantity,
            price,
            dbItem.discountPercent ?? 0,
          ),
        );

        orderItems.push(dbItem);

        if (!success) {
          throw new Error("Failed to insert order item");
        }
      }

      //azuriramo polje total price nakon sto smo dodali sve proizvode
      const updated = await this.orderRepository.updateTotalPrice(
        createdOrder.orderId,
        total,
      );

      if (!updated) {
        throw new Error("Failed to update total price");
      }

      await connection.commit();

      createdOrder.totalPrice = total;

      const data = MapToOrderCreatedEvent(createdOrder, dto, orderItems, total);

      eventBus.emit("order.created", data);

      return createdOrder;
    } catch (error) {
      await connection.rollback(); //u slucaju greske u bilo kom delu keriranja ordera radi rollback i sve brise iz baze
      return new Order();
    } finally {
      connection.release();
    }
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.getByUserId(userId);
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    return this.orderRepository.getById(orderId);
  }

  async changeStatus(orderId: number, status: string): Promise<boolean> {
    return this.orderRepository.updateStatus(orderId, status);
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.getAll();
  }

  async deleteOrder(orderId: number): Promise<boolean> {
    const exists = await this.orderRepository.exists(orderId);
    if (!exists) return false;

    return await this.orderRepository.delete(orderId);
  }

  async getFullOrderDetails(orderId: number): Promise<OrderDetailsDto> {
    const order = await this.orderRepository.getById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    const items = await this.orderRepository.getOrderItems(orderId);

    return {
      order,
      items,
    };
  }
}
