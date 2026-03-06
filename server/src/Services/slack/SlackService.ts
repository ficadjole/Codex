import { IncomingWebhook } from "@slack/webhook";
import { Order } from "../../Domain/models/Order";
import { ISlackService } from "../../Domain/services/slack/ISlackService";
import { Item } from "../../Domain/models/Item";

export class SlackService implements ISlackService {
  async sendNewNotification(
    createdOrder: Order,
    orderItems: Item[],
  ): Promise<void> {
    try {
      const message = {
        text: `🛒 Nova narudžbina #${createdOrder.orderId}`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Nova narudžbina*\nID: ${createdOrder.orderId}\nKupac: ${createdOrder.firstname} ${createdOrder.lastname}`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `Ukupna cena: *${createdOrder.totalPrice} RSD*`,
            },
          },
        ],
      };
      const url = process.env.SLACK_WEBHOOK_URL as string;

      const webhook = new IncomingWebhook(url);

      await webhook.send(message);
    } catch (err) {
      console.error("Slack notification failed", err);
    }
  }
}
