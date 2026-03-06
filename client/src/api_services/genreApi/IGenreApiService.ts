import type { GenreDto } from "../../models/genre/GenreDto";

export interface IGenreApiService {
    getAll(): Promise<GenreDto[]>;
    getById(id: number): Promise<GenreDto>;
    addGenre(token: string, name: string): Promise<boolean>;
    deleteGenre(token: string, id: number): Promise<boolean>;
    updateGenre(token: string, id: number, name: string): Promise<boolean>;
}