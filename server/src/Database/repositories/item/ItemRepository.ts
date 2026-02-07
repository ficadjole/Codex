import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IItemRepository } from "../../../Domain/repositories/IItemRepository";
import db from "../../connection/DbConnectionPool";
import { Item } from "../../../Domain/models/Item";
import { ItemType } from "../../../Domain/enums/ItemType";

export class ItemRepository implements IItemRepository {
  async create(item: Item): Promise<Item> {
    try {
      const query =
        "INSERT INTO items (itemName,price,imageUrl,itemType,descirption,userId) VALUES (?,?,?,?,?,?)";
      const [result] = await db.execute<ResultSetHeader>(query, [
        item.name,
        item.price,
        item.imageUrl,
        item.type,
        item.description,
        item.userId,
      ]);

      if (result.affectedRows > 0) {
        return new Item(
          result.insertId,
          item.name,
          item.price,
          item.imageUrl,
          item.type,
          item.description,
          item.userId,
          new Date(),
        );
      } else {
        return new Item();
      }
    } catch (error) {
      console.log(error);
      return new Item();
    }
  }
  async update(item: Item): Promise<Item> {
    try {
      const query =
        "UPDATE items SET itemName = ?,price = ?,imageUrl = ?,description = ?,itemType = ? WHERE itemId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        item.name,
        item.price,
        item.imageUrl,
        item.description,
        item.type,
        item.itemId,
      ]);

      if (result.affectedRows > 0) {
        return item;
      } else {
        return new Item();
      }
    } catch {
      return new Item();
    }
  }
  async getByName(name: string): Promise<Item> {
    try {
      const query = "SELECT * FROM items WHERE itemName = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [name]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Item(
          row.itemId,
          row.itemName,
          row.price,
          row.imageUrl,
          row.itemType,
          row.description,
          row.userId,
          row.dateCreated,
        );
      } else {
        return new Item();
      }
    } catch {
      return new Item();
    }
  }
  async getById(itemId: number): Promise<Item> {
    try {
      const query = "SELECT * FROM items WHERE itemId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [itemId]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Item(
          row.itemId,
          row.itemName,
          row.price,
          row.imageUrl,
          row.itemType,
          row.description,
          row.userId,
          row.dateCreated,
        );
      } else {
        return new Item();
      }
    } catch {
      return new Item();
    }
  }
  async getByType(itemType: ItemType): Promise<Item[]> {
    try {
      const query = "SELECT * FROM items WHERE itemType = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [itemType]);

      return rows.map(
        (row) =>
          new Item(
            row.itemId,
            row.itemName,
            row.price,
            row.imageUrl,
            row.itemType,
            row.description,
            row.userId,
            row.dateCreated,
          ),
      );
    } catch {
      return [];
    }
  }
  async getAll(): Promise<Item[]> {
    try {
      const query = "SELECT * FROM items ORDER BY itemId ASC";

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new Item(
            row.itemId,
            row.itemName,
            row.price,
            row.imageUrl,
            row.itemType,
            row.description,
            row.userId,
            row.dateCreated,
          ),
      );
    } catch {
      return [];
    }
  }
  async delete(itemId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM items WHERE itemId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [itemId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
