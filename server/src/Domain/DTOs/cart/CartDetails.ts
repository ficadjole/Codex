export class CartDetails {
  public constructor(
    public cartItemId: number = 0,
    public itemId: number = 0,
    public itemName: string = "",
    public price: number = 0,
    public quantity: number = 0,
    public imageUrl?: string,
  ) {}
}
