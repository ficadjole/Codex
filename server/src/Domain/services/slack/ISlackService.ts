import { Item } from "../../models/Item";
import { Order } from "../../models/Order";

export interface ISlackService {
  sendNewNotification(order: Order, items: Item[]): Promise<void>;
}
