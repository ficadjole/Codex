import { GenreDto } from "../../Domain/DTOs/genre/GenreDto";
import { Genre } from "../../Domain/models/Genre";
import { IGenreRepository } from "../../Domain/repositories/IGenreRepository";
import { IGenreService } from "../../Domain/services/genre/IGenreService";

export class GenreService implements IGenreService {
  constructor(private genreRepository: IGenreRepository) {}
  async getGenreByName(name: string): Promise<GenreDto> {
    const genre = await this.genreRepository.getByName(name);

    if (genre.genreId === 0) return new GenreDto();

    return new GenreDto(genre.genreId, genre.name);
  }
  async addGenre(name: string): Promise<GenreDto> {
    const existingGenre = await this.genreRepository.getByName(name);

    if (existingGenre.genreId !== 0) return new GenreDto();

    const newGenre = await this.genreRepository.create(name);

    if (newGenre.genreId === 0) return new GenreDto();

    return new GenreDto(newGenre.genreId, newGenre.name);
  }
  async updateGenre(genre: Genre): Promise<GenreDto> {
    const existingGenre = await this.genreRepository.getById(genre.genreId);

    if (existingGenre.genreId === 0) return new GenreDto();

    const sameGenreName = await this.genreRepository.getByName(genre.name);

    if (sameGenreName.genreId !== 0) return new GenreDto();

    const updatedGenre = await this.genreRepository.update(genre);

    if (updatedGenre.genreId === 0) return new GenreDto();

    return new GenreDto(updatedGenre.genreId, updatedGenre.name);
  }
  async deleteGenre(genreId: number): Promise<boolean> {
    const genre = await this.genreRepository.getById(genreId);

    if (genre.genreId === 0) return false;

    const result = await this.genreRepository.delete(genreId);

    return result;
  }
  async getGenreById(genreId: number): Promise<GenreDto> {
    const genre = await this.genreRepository.getById(genreId);

    if (genre.genreId === 0) return new GenreDto();

    return new GenreDto(genre.genreId, genre.name);
  }
  async getAllGenres(): Promise<GenreDto[]> {
    const allGenres = await this.genreRepository.getAll();

    return allGenres;
  }
}
