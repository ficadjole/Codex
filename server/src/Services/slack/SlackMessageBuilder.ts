import { OrderCreatedEvent } from "../../Events/Payloads/OrderCreatedEvent";

export function buildSlackOrderMessage(data: OrderCreatedEvent) {
  const itemList = data.items
    .map(
      (item) =>
        `• *${item.name}*\n   Količina: ${item.quantity}\n   Cena: ${item.price} RSD`,
    )
    .join("\n");

  const blocks: any[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `🛒 Nova narudžbina #${data.orderId}`,
      },
    },

    { type: "divider" },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `*Kupac*\n` +
          `Ime: ${data.firstname} ${data.lastname}\n` +
          `Email: ${data.email}\n` +
          `Telefon: ${data.telephone ?? "nije ostavljen"}`,
      },
    },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `*Adresa*\n` +
          `${data.city}\n` +
          `${data.street} ${data.streetNumber ?? ""}\n` +
          `${data.postalCode ?? ""}`,
      },
    },
    { type: "divider" },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Proizvodi*\n${itemList}`,
      },
    },
    { type: "divider" },

    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `💰 *Ukupno:* ${data.totalPrice} RSD`,
      },
    },
  ];

  if (data.note) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `📝 *Napomena:* ${data.note}`,
      },
    });
  }

  return { blocks };
}
