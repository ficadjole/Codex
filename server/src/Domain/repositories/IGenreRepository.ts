import { Genre } from "../models/Genre";

export interface IGenreRepository {
  create(name: string): Promise<Genre>;
  delete(genreId: number): Promise<boolean>;
  update(genre: Genre): Promise<Genre>;
  getByName(name: string): Promise<Genre>;
  getById(genreId: number): Promise<Genre>;
  getAll(): Promise<Genre[]>;
}
