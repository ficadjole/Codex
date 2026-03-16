import type { BookCreateDto } from "../models/item/create/BookCreateDto"
import type { BookUpdateDto } from "../models/item/update/BookUpdateDto"
import { mapDiscount } from "./discountMapper"

interface MapBookParams {
  name: string
  price: number | null
  description: string
  author: string
  isbn: string
  nmbrOfPages: number | null
  goodreadsLink: string
  publicationYear: number | null
  cover: "meke" | "tvrde"
  pdf: File | null
  genreIds: number[]
  discountPercent: number | null
  discountFrom: string
  discountTo: string
}

export function mapToBookDto(data: MapBookParams): BookCreateDto {
  return {
    name: data.name,
    price: data.price!,
    description: data.description,
    author: data.author,
    isbn: data.isbn,
    nmbrOfPages: data.nmbrOfPages!,
    goodreadsLink: data.goodreadsLink,
    publicationYear: data.publicationYear!,
    cover: data.cover,
    pdfUrl: data.pdf ? data.pdf.name : "",
    genres: data.genreIds,
    ...mapDiscount(data.discountPercent, data.discountFrom, data.discountTo)
  }
}

export function mapToBookUpdateDto(
  data: MapBookParams,
  itemId: number
): BookUpdateDto {

  const discount = mapDiscount(
    data.discountPercent,
    data.discountFrom,
    data.discountTo
  )

  return {
    itemId,
    name: data.name,
    price: data.price!,
    description: data.description,
    author: data.author,
    isbn: data.isbn,
    nmbrOfPages: data.nmbrOfPages!,
    goodreadsLink: data.goodreadsLink,
    publicationYear: data.publicationYear!,
    cover: data.cover,
    pdfUrl: data.pdf ? data.pdf.name : "",

    genres: data.genreIds,

    type: "knjiga",

    discountPercent: discount.discountPercent ?? undefined,
    discountFrom: discount.discountFrom ?? undefined,
    discountTo: discount.discountTo ?? undefined
  }
}