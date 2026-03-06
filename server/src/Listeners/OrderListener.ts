import { eventBus } from "../Events/EventBus";
import { SlackService } from "../Services/slack/SlackService";

const slackService = new SlackService();

eventBus.on("order.created", async (data) => {
  try {
    await slackService.sendNewNotification(data);
  } catch (error) {
    console.error("Slack notification failed", error);
  }
});
