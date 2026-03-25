import type { ItemDto } from "../ItemDto"
import type { GenreDto } from "../../genre/GenreDto"
import type { ItemImageDto } from "./ItemImageDto"

export interface BookDetailsDto extends ItemDto {
  author              : string
  isbn                : string
  nmbrOfPages         : number
  goodreadsLink       : string
  publicationYear     : number
  cover               : "meke" | "tvrde"
  pdfUrl              ?: string
  genres              : GenreDto[]
  images              : ItemImageDto[]
}