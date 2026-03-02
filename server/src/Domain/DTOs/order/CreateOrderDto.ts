export interface CreateOrderDto {
  items: {
    itemId: number;
    quantity: number;
  }[];

  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  city: string;
  streat: string;
  streatNumber: string;
  postalCode: string;
  note?: string;
}