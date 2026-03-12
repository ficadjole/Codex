export interface BookCreateDto {
  name                : string
  price               : number
  description         : string
  author              : string
  isbn                : string
  nmbrOfPages         : number
  goodreadsLink       : string
  publicationYear     : number
  cover               : "meke" | "tvrde"
  pdfUrl              ?: string,
  genres              : number[]
  discountPercent     ?: number | null
  discountFrom        ?: string | null
  discountTo          ?: string | null
}