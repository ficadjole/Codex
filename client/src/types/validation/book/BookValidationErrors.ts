import type { DiscountValidationErrors } from "../discount/DiscountValidationErrors"

export type BookValidationErrors = DiscountValidationErrors & {
    name                ?: string
    author              ?: string
    isbn                ?: string
    price               ?: string
    pages               ?: string
    description         ?: string
    publicationYear     ?: string
    genreIds            ?: string
    goodreadsLink       ?: string
}