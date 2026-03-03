import { ItemImage } from "../../Domain/models/ItemImage";
import { IItemImageRepository } from "../../Domain/repositories/IItemImageRepository";
import { IItemImageService } from "../../Domain/services/itemImage/IItemImageService";

export class ItemImageService implements IItemImageService {
  constructor(private readonly itemImageRepository: IItemImageRepository) {}

  async addImage(
    itemId: number,
    imageUrl: string,
    isPrimary: boolean = false,
    sortOrder: number = 0,
  ): Promise<ItemImage> {
    const newImage = new ItemImage(
      undefined,
      itemId,
      imageUrl,
      isPrimary,
      sortOrder,
    );

    const result = await this.itemImageRepository.create(newImage);

    if (result.imageId !== 0) {
      return result;
    } else {
      return new ItemImage();
    }
  }

  async deleteImage(imageId: number): Promise<boolean> {
    return await this.itemImageRepository.delete(imageId);
  }

  async getImagesForItem(itemId: number): Promise<ItemImage[]> {
    return await this.itemImageRepository.getByItemId(itemId);
  }

  async getPrimaryImage(itemId: number): Promise<ItemImage> {
    return await this.itemImageRepository.getPrimaryImage(itemId);
  }
}
