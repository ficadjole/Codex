export class OrderItem {
  constructor(
    public orderId: number,
    public itemId: number,
    public quantity: number,
    public price: number,
    public discountPercent: number | null
  ) {}
}