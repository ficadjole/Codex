import db from "../../Database/connection/DbConnectionPool";
import { ItemRepository } from "../../Database/repositories/item/ItemRepository";
import { CreateOrderDto } from "../../Domain/DTOs/order/CreateOrderDto";
import { OrderStatus } from "../../Domain/enums/OrderStatus";
import { Order } from "../../Domain/models/Order";
import { OrderItem } from "../../Domain/models/OrderItem";
import { IOrderRepository } from "../../Domain/repositories/IOrderRepository";
import { IOrderService } from "../../Domain/services/order/IOrderService";

export class OrderService implements IOrderService {
    constructor(private orderRepository: IOrderRepository) { }

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
                dto.telephone || null,
                dto.city,
                dto.streat,
                dto.streatNumber || null,
                dto.postalCode || null,
                dto.note || null
            );

            // 1️⃣ Kreiramo order
            const createdOrder = await this.orderRepository.create(order);

            if (!createdOrder.orderId) {
                throw new Error("Order creation failed");
            }

            let total = 0;

            const itemRepository = new ItemRepository();

            // 2️⃣ Dodajemo stavke
            for (const item of dto.items) {

                const dbItem = await itemRepository.getById(item.itemId);

                if (!dbItem || dbItem.itemId === null) {
                    throw new Error("Item does not exist");
                }

                const price = dbItem.price;

                total += price * item.quantity;

                const success = await this.orderRepository.addOrderItem(
                    new OrderItem(
                        createdOrder.orderId,
                        item.itemId,
                        item.quantity,
                        price,
                        null
                    )
                );

                if (!success) {
                    throw new Error("Failed to insert order item");
                }
            }

            // 3️⃣ Update total price
            const updated = await this.orderRepository.updateTotalPrice(
                createdOrder.orderId,
                total
            );

            if (!updated) {
                throw new Error("Failed to update total price");
            }

            await connection.commit();

            createdOrder.totalPrice = total;

            return createdOrder;

        } catch (error) {

            await connection.rollback();
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
}