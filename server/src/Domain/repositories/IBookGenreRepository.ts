import { BookGenre } from "../models/BookGenre";

export interface IBookGenreRepository {
  create(bookId: number, genreId: number): Promise<BookGenre>;
  delete(bookId: number, genreId: number): Promise<boolean>;
  deleteGenresForBook(bookId: number): Promise<boolean>;
  update(bookGenre: BookGenre, newGenreId: number): Promise<BookGenre>;
  getByBookId(bookId: number): Promise<BookGenre[]>;
  getByGenreId(genreId: number): Promise<BookGenre[]>;
}
