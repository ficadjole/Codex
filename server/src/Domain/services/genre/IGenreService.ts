import { GenreDto } from "../../DTOs/genre/GenreDto";
import { Genre } from "../../models/Genre";

export interface IGenreService {
  addGenre(name: string): Promise<GenreDto>;
  updateGenre(genre: Genre): Promise<GenreDto>;
  deleteGenre(genreId: number): Promise<boolean>;
  getGenreById(genreId: number): Promise<GenreDto>;
  getGenreByName(name: string): Promise<GenreDto>;
  getAllGenres(): Promise<GenreDto[]>;
}
