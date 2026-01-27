import { ItemType } from "../enums/ItemType";
import { Item } from "./Item";

export class Book extends Item {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public imageUrl: string = "",
    public userId: number = 0,
    public isbn: string = "",
    public author: string = "",
    public nmbrOfPages: number = 0,
    public cover: "meke" | "tvrde" = "meke",
    public publicationYear: number = 0,
    public description: string = "",
    public goodreadsLink = "",
    public genres?: number[] //ovo su nam zanrovi knjige koji ce se prolsedjivati zajedno sa njom
  ) {
    super(
      itemId,
      name,
      price,
      imageUrl,
      ItemType.BOOK,
      description,
      userId,
      new Date(1944, 6, 6, 0, 0, 0, 0)
    );
  }
}
