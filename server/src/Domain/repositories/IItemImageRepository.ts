import { setPrimaryImageDTO } from "../DTOs/itemImages/setPrimaryImageDTO";
import { ItemImage } from "../models/ItemImage";

export interface IItemImageRepository {
  create(image: ItemImage): Promise<ItemImage>;
  delete(imageId: number): Promise<boolean>;
  getByItemId(itemId: number): Promise<ItemImage[]>;
  getPrimaryImage(itemId: number): Promise<ItemImage>;
  setPrimaryImage(image: setPrimaryImageDTO): Promise<boolean>;
  getImageById(imageId: number): Promise<ItemImage>;
}
