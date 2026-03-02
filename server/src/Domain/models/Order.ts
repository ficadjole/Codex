import { OrderStatus } from "../enums/OrderStatus";

export class Order {
  constructor(
    public orderId: number | null = null,
    public userId: number | null = null,
    public orderDate: Date = new Date(),
    public orderStatus: string = "",
    public totalPrice: number = 0,
    public firstname: string = "",
    public lastname: string = "",
    public email: string = "",
    public telephone: string | null = null,
    public city: string = "",
    public streat: string = "",
    public streatNumber: string | null = null,
    public postalCode: string | null = null,
    public note: string | null = null
  ) {}
}