import { AccessoryDetailsDto } from "../../Domain/DTOs/article/AccessoryDetailsDto";
import { ItemDto } from "../../Domain/DTOs/article/ItemDto";
import { BookDetailsDto } from "../../Domain/DTOs/article/BookDetailsDto";
import { ItemType } from "../../Domain/enums/ItemType";
import { Item } from "../../Domain/models/Item";
import { Book } from "../../Domain/models/Book";
import { IAccessoryRepository } from "../../Domain/repositories/IAccessoryRepository";
import { IItemRepository } from "../../Domain/repositories/IItemRepository";
import { IGenreRepository } from "../../Domain/repositories/IGenreRepository";
import { IBookGenreRepository } from "../../Domain/repositories/IBookGenreRepository";
import { IBookRepository } from "../../Domain/repositories/IBookRepository";
import { IItemService } from "../../Domain/services/item/IItemService";
import { Accessories } from "../../Domain/models/Accessories";

export class ItemService implements IItemService {
  constructor(
    private itemRepository: IItemRepository,
    private bookRepository: IBookRepository,
    private genreRepository: IGenreRepository,
    private bookGenreRepository: IBookGenreRepository,
    private accessoryRepository: IAccessoryRepository,
  ) {}

  async addItem(item: Item): Promise<ItemDto> {
    const newItem = await this.itemRepository.create(item);
    if (newItem.itemId === 0) return new ItemDto();

    switch (item.type) {
      case ItemType.BOOK:
        const newBook = { ...(item as Book), itemId: newItem.itemId };
        const addedBook = await this.bookRepository.create(newBook);
        if (addedBook.itemId === 0) return new ItemDto();

        if (newBook.genres?.length) {
          for (const genreId of newBook.genres) {
            const existingGenre = await this.genreRepository.getById(genreId);
            if (existingGenre.genreId !== 0) {
              const addedRelation = await this.bookGenreRepository.create(
                newBook.itemId,
                genreId,
              );
              if (addedRelation.genreId === 0) return new ItemDto();
            } else {
              return new ItemDto(); // Do not allow adding new genres via this endpoint
            }
          }
        }
        break;

      case ItemType.ACCESSORIES:
        const addedAccessory = await this.accessoryRepository.create({
          ...(item as Accessories),
          itemId: newItem.itemId,
        });
        if (addedAccessory.itemId === 0) return new ItemDto();
        break;
    }

    return new ItemDto(
      newItem.itemId,
      newItem.name,
      newItem.price,
      newItem.imageUrl,
      newItem.type,
      newItem.createdAt,
    );
  }

  async updateItem(item: Item): Promise<ItemDto> {
    const existingItem = await this.itemRepository.getById(item.itemId);
    if (existingItem.itemId === 0) return new ItemDto();

    const updatedItem = await this.itemRepository.update(item);
    if (updatedItem.itemId === 0) return new ItemDto();

    switch (item.type) {
      case ItemType.BOOK:
        const updatedBook = await this.bookRepository.update(item as Book);
        if (updatedBook.genres?.length) {
          await this.bookGenreRepository.deleteGenresForBook(
            updatedBook.itemId,
          );
          for (const genreId of updatedBook.genres) {
            const existingGenre = await this.genreRepository.getById(genreId);
            if (existingGenre.genreId !== 0) {
              const addedRelation = await this.bookGenreRepository.create(
                updatedBook.itemId,
                genreId,
              );
              if (addedRelation.genreId === 0) return new ItemDto();
            } else {
              return new ItemDto();
            }
          }
        }
        break;

      case ItemType.ACCESSORIES:
        const updatedAccessory = await this.accessoryRepository.update(
          item as Accessories,
        );
        if (updatedAccessory.itemId === 0) return new ItemDto();
        break;
    }

    return new ItemDto(
      updatedItem.itemId,
      updatedItem.name,
      updatedItem.price,
      updatedItem.imageUrl,
      updatedItem.type,
      updatedItem.createdAt,
    );
  }

  async deleteItem(itemId: number): Promise<boolean> {
    const existingItem = await this.itemRepository.getById(itemId);
    if (existingItem.itemId === 0) return false;

    return this.itemRepository.delete(itemId);
  }

  async getItemById(itemId: number): Promise<ItemDto> {
    const item = await this.itemRepository.getById(itemId);
    if (item.itemId === 0) return new ItemDto();

    return new ItemDto(
      item.itemId,
      item.name,
      item.price,
      item.imageUrl,
      item.type,
      item.createdAt,
    );
  }

  async getAllItems(): Promise<ItemDto[]> {
    const items = await this.itemRepository.getAll();
    return items.map(
      (item) =>
        new ItemDto(
          item.itemId,
          item.name,
          item.price,
          item.imageUrl,
          item.type,
          item.createdAt,
        ),
    );
  }

  async getItemsByType(type: ItemType): Promise<ItemDto[]> {
    const items = await this.itemRepository.getByType(type);
    return items.map(
      (item) =>
        new ItemDto(
          item.itemId,
          item.name,
          item.price,
          item.imageUrl,
          item.type,
          item.createdAt,
        ),
    );
  }

  async getBook(itemId: number): Promise<BookDetailsDto> {
    const book = await this.bookRepository.getById(itemId);
    if (book.itemId === 0) return new BookDetailsDto();

    const bookGenres = await this.bookGenreRepository.getByBookId(itemId);
    const genresDto = await Promise.all(
      bookGenres.map(async (bg) => {
        const genre = await this.genreRepository.getById(bg.genreId);
        return { genreId: genre.genreId, name: genre.name };
      }),
    );

    return new BookDetailsDto(
      book.itemId,
      book.name,
      book.price,
      book.imageUrl,
      book.author,
      book.isbn,
      book.nmbrOfPages,
      book.description,
      book.goodreadsLink,
      new Date(book.publicationYear, 0, 1),
      genresDto,
    );
  }

  async getAccessory(itemId: number): Promise<AccessoryDetailsDto> {
    const accessory = await this.accessoryRepository.getById(itemId);
    if (accessory.itemId === 0) return new AccessoryDetailsDto();

    return new AccessoryDetailsDto(
      accessory.itemId,
      accessory.name,
      accessory.price,
      accessory.imageUrl,
      accessory.description,
      accessory.content,
    );
  }
}
