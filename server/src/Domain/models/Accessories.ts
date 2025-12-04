import { ItemType } from "../enums/ItemType";
import { Item } from "./Item";

export class Accessories extends Item {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public imageUrl: string = "",
    public userId: number = 0,
    public description: string = "",
    public content: string = ""
  ) {
    super(
      itemId,
      name,
      price,
      imageUrl,
      ItemType.ACCESSORIES,
      description,
      userId,
      new Date(1944, 6, 6, 0, 0, 0, 0)
    );
  }
}
