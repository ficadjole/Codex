export interface CreateOrderItemDto {
  itemId: number;
  quantity: number;
}

export interface CreateOrderDto {
  firstname: string;
  lastname: string;
  email: string;
  telephone?: string;
  city: string;
  streat: string;
  streatNumber?: string;
  postalCode?: string;
  note?: string;
  items: CreateOrderItemDto[];
}