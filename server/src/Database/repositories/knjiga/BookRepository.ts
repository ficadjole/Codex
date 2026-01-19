import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../../connection/DbConnectionPool";
import { IBookRepository } from "../../../Domain/repositories/IBookRepository";
import { Book } from "../../../Domain/models/Book";

export class BookRepository implements IBookRepository {
  getById(itemId: number): Promise<Book> {
    throw new Error("Method not implemented.");
  }
  getByAuthor(author: string): Promise<Book[]> {
    throw new Error("Method not implemented.");
  }
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
        book.goodreads_link,
      ]);

      if (result.affectedRows > 0) {
        return new Book(
          book.itemId,
          book.name,
          book.price,
          book.imageUrl,
          book.userId,
          book.isbn,
          book.author,
          book.nmbrOfPages,
          book.cover,
          book.publicationYear,
          book.description,
          book.goodreads_link
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
        book.goodreads_link,
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
  async getByKnjigaID(artikal_id: number): Promise<Book> {
    try {
      const query = "SELECT * FROM knjiga WHERE artikal_id = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [artikal_id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Book(
          row.artikal_id,
          row.naziv,
          row.cena,
          row.slika_url,
          row.korisnik_id,
          row.isbn,
          row.autor,
          row.broj_strana,
          row.korice,
          row.godina_izdanja,
          row.opis,
          row.goodreads_link
        );
      } else {
        return new Book();
      }
    } catch {
      return new Book();
    }
  }
  async getByAutor(autor: string): Promise<Book[]> {
    try {
      const query =
        "SELECT * FROM knjiga WHERE autor = ? ORDER BY godina_izdanja DESC";

      const [rows] = await db.execute<RowDataPacket[]>(query, [autor]);

      return rows.map(
        (row) =>
          new Book(
            row.artikal_id,
            row.naziv,
            row.cena,
            row.slika_url,
            row.korisnik_id,
            row.isbn,
            row.autor,
            row.broj_strana,
            row.korice,
            row.godina_izdanja,
            row.opis,
            row.goodreads_link
          )
      );
    } catch {
      return [];
    }
  }
}
