import axios from "axios"
import type { GenreDto } from "../../models/genre/GenreDto"
import type { IGenreApiService } from "./IGenreApiService"

const API_URL: string = import.meta.env.VITE_API_URL + "genre";

export const genreApi : IGenreApiService = {

  async getAll(): Promise<GenreDto[]> {
    const res = await axios.get(`${API_URL}`)
    return res.data.data
  },

  async getById(id: number): Promise<GenreDto> {
    try {
      const res = await axios.get(`${API_URL}/${id}`)
      return res.data.data
    } catch {
      return {} as GenreDto;
    }
  },

  async addGenre(token: string, name: string): Promise<boolean> {
    try {

      await axios.post(
        `${API_URL}/addGenre`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return true

    } catch {
      return false
    }
  },

  async deleteGenre(token: string, id: number): Promise<boolean> {

    try {

      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return true

    } catch {
      return false
    }
  },

  async updateGenre(token: string, id: number, name: string): Promise<boolean> {

    try {

      await axios.put(
        `${API_URL}/${id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      return true

    } catch {
      return false
    }
  }

}