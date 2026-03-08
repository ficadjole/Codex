import type { ItemDto } from "./ItemDto"

export interface BookDetailsDto extends ItemDto {
  author            : string
  isbn              : string
  nmbrOfPages       : number
  goodreadsLink     : string
  publicationYear   : number
  cover             : "meke" | "tvrde"
  pdfUrl            ?: string
  genres            : number[]
  images            : string[]
}