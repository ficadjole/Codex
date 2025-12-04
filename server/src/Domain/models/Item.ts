import { ItemType } from "../enums/ItemType";

export class Item {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public imageUrl: string = "",
    public itemType: ItemType = ItemType.BOOK,
    public description: string = "",
    public userId: number = 0,
    public dateCreated?: Date
  ) {}
}
