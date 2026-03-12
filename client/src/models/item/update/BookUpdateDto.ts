export interface BookUpdateDto {
    itemId: number

    name: string
    price: number
    description: string

    author: string
    isbn: string
    nmbrOfPages: number
    goodreadsLink: string
    publicationYear: number
    cover: "meke" | "tvrde"

    pdfUrl?: string

    genres: number[] 

    discountPercent?: number
    discountFrom?: string
    discountTo?: string

    type: "knjiga"
}