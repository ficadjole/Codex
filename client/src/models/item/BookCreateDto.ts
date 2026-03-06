export interface BookCreateDto {
  name              : string
  price             : number
  author            : string
  isbn              : string
  pages             : number
  description       : string
  goodreadsLink     : string
  publicationDate   : number
  genreIds          : number[]

  discountPercent   ?: number
  discountFrom      ?: string
  discountTo        ?: string

}