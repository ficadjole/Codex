import { ItemType } from "../enums/ItemType";

export class Item {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public discountPercent?: number,
    public discountFrom?: Date,
    public discountTo?: Date,
    public imageUrl: string = "",
    public type: ItemType = ItemType.BOOK,
    public description: string = "",
    public userId: number = 0,
    public createdAt?: Date,
  ) {}
}
