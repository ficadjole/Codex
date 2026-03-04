export interface OrderItemDto {
  itemId: number;
  quantity: number;
  price: number;
}

export interface OrderResponseDto {
  orderId: number;
  userId: number;
  orderStatus: string;
  totalPrice: number;
  createdAt: string;

  firstname: string;
  lastname: string;
  email: string;
  telephone?: string;

  city: string;
  streat: string;
  streatNumber?: string;
  postalCode?: string;
  note?: string;

  items?: OrderItemDto[];
}