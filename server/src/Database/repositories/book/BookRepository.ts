import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { IBookRepository } from "../../../Domain/repositories/IBookRepository";
import { Book } from "../../../Domain/models/Book";

export class BookRepository implements IBookRepository {
  async create(book: Book): Promise<Book> {
    try {
      const query =
        "INSERT INTO books (itemId,isbn,author,nmbrOfPages,cover,publicationYear,goodreads_link) VALUES (?,?,?,?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        book.itemId,
        book.isbn,
        book.author,
        book.nmbrOfPages,
        book.cover,
        book.publicationYear,
        book.goodreadsLink,
      ]);

      if (result.affectedRows > 0) {
        return new Book(
          book.itemId,
          book.name,
          book.price,
          book.discountPercent,
          book.discountFrom,
          book.discountTo,
          book.imageUrl,
          book.userId,
          book.isbn,
          book.author,
          book.nmbrOfPages,
          book.cover,
          book.publicationYear,
          book.description,
          book.goodreadsLink,
        );
      } else {
        return new Book();
      }
    } catch {
      return new Book();
    }
  }
  async update(book: Book): Promise<Book> {
    try {
      const query =
        "UPDATE books SET isbn = ?, author = ?, nmbrOfPages = ?, cover = ?, publicationYear = ?, goodreads_link = ? WHERE itemId = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        book.isbn,
        book.author,
        book.nmbrOfPages,
        book.cover,
        book.publicationYear,
        book.goodreadsLink,
        book.itemId,
      ]);

      if (result.affectedRows > 0) {
        return book;
      } else {
        return new Book();
      }
    } catch {
      return new Book();
    }
  }
  // async obrisiKnjigu(artikal_id: number): Promise<boolean> {
  //   try {
  //     const query = "DELETE FROM knjiga WHERE artikal_id = ?";

  //     const [result] = await db.execute<ResultSetHeader>(query, [artikal_id]);

  //     return result.affectedRows > 0;
  //   } catch {
  //     return false;
  //   }
  // }
  async getById(artikal_id: number): Promise<Book> {
    try {
      const query = "SELECT * FROM books WHERE itemId = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [artikal_id]);

      if (rows.length > 0) {
        const book = rows[0];
        return new Book(
          book.itemId,
          book.name,
          book.price,
          book.discountPercent,
          book.discountFrom,
          book.discountTo,
          book.imageUrl,
          book.userId,
          book.isbn,
          book.author,
          book.nmbrOfPages,
          book.cover,
          book.publicationYear,
          book.description,
          book.goodreadsLink,
        );
      } else {
        return new Book();
      }
    } catch (error) {
      return new Book();
    }
  }
  async getByAuthor(autor: string): Promise<Book[]> {
    try {
      const query =
        "SELECT * FROM knjiga WHERE autor = ? ORDER BY godina_izdanja DESC";

      const [rows] = await db.execute<RowDataPacket[]>(query, [autor]);

      return rows.map(
        (book) =>
          new Book(
            book.itemId,
            book.name,
            book.price,
            book.discountPercent,
            book.discountFrom,
            book.discountTo,
            book.imageUrl,
            book.userId,
            book.isbn,
            book.author,
            book.nmbrOfPages,
            book.cover,
            book.publicationYear,
            book.description,
            book.goodreadsLink,
          ),
      );
    } catch {
      return [];
    }
  }
}
