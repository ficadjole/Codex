import { AccessoryDetailsDto } from "../../DTOs/artikal/AccessoryDetailsDto";
import { BookDetailsDto } from "../../DTOs/artikal/BookDetailsDto";
import { ItemDto } from "../../DTOs/artikal/ItemDto";
import { ItemType } from "../../enums/ItemType";
import { Item } from "../../models/Item";

export interface IItemService {
  addItem(item: Item): Promise<ItemDto>;
  updateItem(item: Item): Promise<ItemDto>;
  deleteItem(itemId: number): Promise<boolean>;
  getItemById(itemId: number): Promise<ItemDto>;
  getAllItems(): Promise<ItemDto[]>;
  getItemsByType(type: ItemType): Promise<ItemDto[]>;
  getBook(itemId: number): Promise<BookDetailsDto>;
  getAccessory(itemId: number): Promise<AccessoryDetailsDto>;
}
