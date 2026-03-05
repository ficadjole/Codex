import { GenreDto } from "../genre/GenreDto";

export class BookDetailsDto {
  public constructor(
    public itemId: number = 0,
    public name: string = "",
    public price: number = 0,
    public discountPercent?: number,
    public discountFrom?: Date,
    public discountTo?: Date,
    public author: string = "",
    public isbn: string = "",
    public pages: number = 0,
    public description: string = "",
    public goodreadsLink: string = "",
    public publicationDate: number = 0,
    public genres: GenreDto[] = [],
    public images: string[] = [],
  ) {}
}
