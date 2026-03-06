export interface OrderCreatedEvent {
  orderId: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  city: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  note?: string | null;
  totalPrice: number;

  items: {
    itemId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}
