import { ItemType } from "../enums/ItemType";
import { Item } from "../models/Item";

export interface IItemRepository {
  create(item: Item): Promise<Item>;
  update(item: Item): Promise<Item>;
  delete(itemId: number): Promise<boolean>;
  getByName(itemName: string): Promise<Item>;
  getById(itemId: number): Promise<Item>;
  getByType(itemType: ItemType): Promise<Item[]>;
  getAll(): Promise<Item[]>;
}
