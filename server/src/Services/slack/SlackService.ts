import { IncomingWebhook } from "@slack/webhook";
import { ISlackService } from "../../Domain/services/slack/ISlackService";
import { buildSlackOrderMessage } from "./SlackMessageBuilder";
import { OrderCreatedEvent } from "../../Events/Payloads/OrderCreatedEvent";

export class SlackService implements ISlackService {
  async sendNewNotification(data: OrderCreatedEvent): Promise<void> {
    try {
      const message = buildSlackOrderMessage(data);
      const url = process.env.SLACK_WEBHOOK_URL as string;

      const webhook = new IncomingWebhook(url);

      await webhook.send(message);
    } catch (err) {
      console.error("Slack notification failed", err);
    }
  }
}
