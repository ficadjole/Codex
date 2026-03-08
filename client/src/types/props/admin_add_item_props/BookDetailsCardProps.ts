import type { GenreDto } from "../../../models/genre/GenreDto";

export type BookDetailsCardProps = {
    name: string
        setName: (v: string) => void
        author: string
        setAuthor: (v: string) => void
        isbn: string
        setIsbn: (v: string) => void
        price: number
        setPrice: (v: number) => void
        nmbrOfPages: number
        setNmbrOfPages: (v: number) => void
        description: string
        setDescription: (v: string) => void
        goodreadsLink: string
        setGoodreadsLink: (v: string) => void
        publicationYear: number
        setPublicationYear: (v: number) => void
        cover: "meke" | "tvrde"
        setCover: (v: "meke" | "tvrde") => void
        genres: GenreDto[]
        genreIds: number[]
        toggleGenre: (id: number) => void
};