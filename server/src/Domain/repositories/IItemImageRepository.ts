import { ItemImage } from "../models/ItemImage";

export interface IItemImageRepository {
  create(image: ItemImage): Promise<ItemImage>;
  delete(imageId: number): Promise<boolean>;
  getByItemId(itemId: number): Promise<ItemImage[]>;
  getPrimaryImage(itemId: number): Promise<ItemImage>;
}
