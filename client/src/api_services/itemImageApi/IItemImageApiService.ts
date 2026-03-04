
export interface IItemImageApiService {
  // AUTH (admin / authenticated user)
  addImage(
    token: string,
    itemId: number,
    imageUrl: string,
    isPrimary?: boolean,
    sortOrder?: number
  ): Promise<boolean>;

  deleteImage(token: string, imageId: number): Promise<boolean>;
}