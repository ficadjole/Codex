import type { AccessoryCreateDto } from "../../models/item/AccessoryCreateDto";
import type { AccessoryDetailsDto } from "../../models/item/AccessoryDetailsDto";
import type { BookCreateDto } from "../../models/item/BookCreateDto";
import type { BookDetailsDto } from "../../models/item/BookDetailsDto";
import type { ItemDto } from "../../models/item/ItemDto";

export interface IItemApiService {
  // public methods
  getAllItems(): Promise<ItemDto[]>;
  getItemById(itemId: number): Promise<ItemDto>;
  getItemsByType(type: string): Promise<ItemDto[]>;
  getBook(itemId: number): Promise<BookDetailsDto>;
  getAccessory(itemId: number): Promise<AccessoryDetailsDto>;

  // ADMIN (requires token)
  addBook(token: string, book: BookCreateDto): Promise<number>;
  addAccessory(token: string, accessory: AccessoryCreateDto) : Promise<number>;
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