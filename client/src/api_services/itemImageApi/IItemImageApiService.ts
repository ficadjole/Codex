import type { ItemImageCreateDto } from "../../models/item/create/ItemImageCreateDto";

export interface IItemImageApiService {
  // AUTH (admin / authenticated user)
  addImage(
     token: string,
     itemId: number,
     image: ItemImageCreateDto
   ): Promise<boolean>;
  deleteImage(token: string, imageId: number): Promise<boolean>;
}