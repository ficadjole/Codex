import type { AccessoryCreateDto } from "../../models/item/create/AccessoryCreateDto";
import type { BookCreateDto } from "../../models/item/create/BookCreateDto";
import type { BookDetailsDto } from "../../models/item/details/BookDetailsDto";
import type { BookUpdateDto } from "../../models/item/update/BookUpdateDto";
import type { ItemDto } from "../../models/item/ItemDto";
import type { AccessoryDetailsDto } from "../../models/item/details/AccessoryDetailsDto";
import type { AccessoryUpdateDto } from "../../models/item/update/AccessoryUpdateDto";

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
  updateItem(token: string, itemId: number, item: ItemDto | BookUpdateDto | AccessoryUpdateDto): Promise<boolean>;
  deleteItem(token: string, itemId: number): Promise<boolean>;

  addDiscount(
    token: string,
    itemId: number,
    discountPercent: number,
    discountFrom: string,
    discountTo: string
  ): Promise<boolean>;
}