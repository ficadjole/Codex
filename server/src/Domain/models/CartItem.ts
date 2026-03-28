export class CartItem {
  public constructor(
    public cartItemId: number = 0,
    public cartId: number = 0,
    public itemId: number = 0,
    public quantity: number = 1,
  ) {}
}
