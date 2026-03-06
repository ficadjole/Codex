import type { ItemDto } from "./ItemDto"

export interface BookDetailsDto extends ItemDto {
  author            : string
  isbn              : string
  pages             : number
  goodreadsLink     : string
  cover             : "meke" | "tvrde"
  publicationDate   : number
  genreIds          : number[]
  images            : string[]
}