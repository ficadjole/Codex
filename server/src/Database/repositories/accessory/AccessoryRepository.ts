import { ResultSetHeader , RowDataPacket} from "mysql2";
import db from "../../connection/DbConnectionPool";
import { IAccessoryRepository } from "../../../Domain/repositories/IAccessoryRepository";
import { Accessories } from "../../../Domain/models/Accessories";

export class AccessoryRepository implements IAccessoryRepository {
  async create(accesory: Accessories): Promise<Accessories> {
    try {
      const query = "INSERT INTO accessories (itemId,content) VALUES (?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        accesory.itemId,
        accesory.content,
      ]);

      if (result.affectedRows > 0) {
        return new Accessories(
          accesory.itemId,
          accesory.name,
          accesory.price,
          accesory.discountPercent,
          accesory.discountFrom,
          accesory.discountTo,
          accesory.userId,
          accesory.description,
          accesory.content,
        );
      } else {
        return new Accessories();
      }
    } catch (error) {
      return new Accessories();
    }
  }
  async update(accesory: Accessories): Promise<Accessories> {
    try {
      const query = "UPDATE accessories SET content = ? WHERE itemId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        accesory.content,
        accesory.itemId,
      ]);

      if (result.affectedRows > 0) {
        return accesory;
      } else {
        return new Accessories();
      }
    } catch {
      return new Accessories();
    }
  }

  async getById(itemId: number): Promise<Accessories> {
    try {
      const query = "SELECT * FROM accessories WHERE itemId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [itemId]);
      if (rows.length > 0) {
        const row = rows[0];
        return new Accessories(
          row.itemId,
          row.name,
          row.price,
          row.discountPercent,
          row.discountFrom,
          row.discountTo,
          row.userId,
          row.description,
          row.content,
        );
      } else {
        return new Accessories();
      }
    } catch {
      return new Accessories();
    }
  }
}
