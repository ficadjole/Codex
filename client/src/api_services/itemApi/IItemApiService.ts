import type { ItemDto } from "../../models/item/ItemDto";

export interface IItemApiService {
  // public methods
  getAllItems(): Promise<ItemDto[]>;
  getItemById(itemId: number): Promise<ItemDto>;
  getItemsByType(type: string): Promise<ItemDto[]>;

  // ADMIN (requires token)
  addItem(token: string, item: ItemDto): Promise<boolean>;
  updateItem(token: string, itemId: number, item: ItemDto): Promise<boolean>;
  deleteItem(token: string, itemId: number): Promise<boolean>;

  addDiscount(
    token: string,
    itemId: number,
    discountPercent: number,
    discountFrom: string,
    discountTo: string
  ): Promise<boolean>;
}