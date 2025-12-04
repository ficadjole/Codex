import { Book } from "../models/Book";

export interface IBookRepository {
  create(book: Book): Promise<Book>;
  update(book: Book): Promise<Book>;
  getById(itemId: number): Promise<Book>;
  getByAuthor(author: string): Promise<Book[]>;
}
