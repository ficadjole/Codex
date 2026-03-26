import { setPrimaryImageDTO } from "../../DTOs/itemImages/setPrimaryImageDTO";
import { ItemImage } from "../../models/ItemImage";

export interface IItemImageService {
  addImage(
    itemId: number,
    imageUrl: string,
    isPrimary?: boolean,
    sortOrder?: number,
  ): Promise<ItemImage>;

  deleteImage(imageId: number): Promise<boolean>;

  getImagesForItem(itemId: number): Promise<ItemImage[]>;

  getPrimaryImage(itemId: number): Promise<ItemImage>;

  setPrimaryImage(image: setPrimaryImageDTO): Promise<boolean>;
}
