import { eventBus } from "../Events/EventBus";
import { SlackService } from "../Services/slack/SlackService";

const slackService = new SlackService();

eventBus.on("order.created", async ({ createdOrder, orderItems }) => {
  try {
    await slackService.sendNewNotification(createdOrder, orderItems);
  } catch (error) {
    console.error("Slack notification failed", error);
  }
});
