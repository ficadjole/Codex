export interface OrderItemDto {
  orderId: number;
  itemId: number;
  quantity: number;
  price: number;
  discountPercent: number | null;
}

export interface OrderResponseDto {
  orderId: number;
  userId: number;
  orderStatus: string;
  totalPrice: number;
  orderDate: string;

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