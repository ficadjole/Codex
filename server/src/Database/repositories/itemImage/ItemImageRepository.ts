import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ItemImage } from "../../../Domain/models/ItemImage";
import db from "../../connection/DbConnectionPool";
import { IItemImageRepository } from "../../../Domain/repositories/IItemImageRepository";

export class ItemImageRepository implements IItemImageRepository {
  async create(image: ItemImage): Promise<ItemImage> {
    const query = `
      INSERT INTO itemImages (itemId, imageUrl, isPrimary, sortOrder)
      VALUES (?, ?, ?, ?)
    `;

    if (image.isPrimary) {
      await db.execute(
        "UPDATE itemImages SET isPrimary = FALSE WHERE itemId = ? AND isPrimary = TRUE",
        [image.itemId],
      );
    } //postavljamo sve ostale slike tog itema na false.

    const [result] = await db.execute<ResultSetHeader>(query, [
      image.itemId,
      image.imageUrl,
      image.isPrimary ?? false,
      image.sortOrder ?? 0,
    ]);

    return new ItemImage(
      result.insertId,
      image.itemId,
      image.imageUrl,
      image.isPrimary ?? false,
      image.sortOrder ?? 0,
    );
  }

  async delete(imageId: number): Promise<boolean> {
    const query = `DELETE FROM itemImages WHERE imageId = ?`;

    const [result] = await db.execute<ResultSetHeader>(query, [imageId]);

    return result.affectedRows > 0;
  }

  async getByItemId(itemId: number): Promise<ItemImage[]> {
    const query = `
      SELECT imageId, itemId, imageUrl, isPrimary, sortOrder
      FROM itemImages
      WHERE itemId = ?
      ORDER BY isPrimary DESC, sortOrder ASC
    `;

    const [rows] = await db.execute<RowDataPacket[]>(query, [itemId]);

    return rows.map(
      (row) =>
        new ItemImage(
          row.imageId,
          row.itemId,
          row.imageUrl,
          !!row.isPrimary, //jer koristimu tinyint za boolean u bazi
          row.sortOrder,
        ),
    );
  }

  async getPrimaryImage(itemId: number): Promise<ItemImage> {
    const query = `
      SELECT imageId, itemId, imageUrl, isPrimary, sortOrder
      FROM itemImages
      WHERE itemId = ? AND isPrimary = TRUE
      LIMIT 1
    `;

    const [rows] = await db.execute<RowDataPacket[]>(query, [itemId]);

    if (rows.length === 0) return new ItemImage();

    const row = rows[0];

    return new ItemImage(
      row.imageId,
      row.itemId,
      row.imageUrl,
      !!row.isPrimary,
      row.sortOrder,
    );
  }
}
