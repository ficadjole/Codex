import type { GenreDto } from "../../../models/genre/GenreDto";
import type { BookValidationErrors } from "../../validation/book/BookValidationErrors";

export type BookDetailsCardProps = {
    name: string
    setName: (v: string) => void
    author: string
    setAuthor: (v: string) => void
    isbn: string
    setIsbn: (v: string) => void
    price: number | null
    setPrice: React.Dispatch<React.SetStateAction<number | null>>
    nmbrOfPages: number | null
    setNmbrOfPages: React.Dispatch<React.SetStateAction<number | null>>
    description: string
    setDescription: (v: string) => void
    goodreadsLink: string
    setGoodreadsLink: (v: string) => void
    publicationYear: number | null
    setPublicationYear: React.Dispatch<React.SetStateAction<number | null>>    
    cover: "meke" | "tvrde"
    setCover: (v: "meke" | "tvrde") => void
    genres: GenreDto[]
    genreIds: number[]
    toggleGenre: (id: number) => void
    errors: BookValidationErrors
};