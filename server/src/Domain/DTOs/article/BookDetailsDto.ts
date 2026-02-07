import { GenreDto } from "../genre/GenreDto";

export class BookDetailsDto {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public imageUrl: string = "",
    public author: string = "",
    public isbn: string = "",
    public pages: number = 0,
    public description: string = "",
    public goodreadsLink: string = "",
    public publicationDate: Date = new Date(),
    public genres: GenreDto[] = []
  ) {}
}