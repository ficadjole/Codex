import { OrderCreatedEvent } from "../../../Events/Payloads/OrderCreatedEvent";

export interface ISlackService {
  sendNewNotification(data: OrderCreatedEvent): Promise<void>;
}
