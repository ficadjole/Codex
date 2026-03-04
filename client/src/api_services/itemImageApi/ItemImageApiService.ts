import axios from "axios";
import type { IItemImageApiService } from "./IItemImageApiService";

const API_URL: string = import.meta.env.VITE_API_URL + "itemImages";

export const itemImageApi: IItemImageApiService = {
  async addImage(
    token: string,
    itemId: number,
    imageUrl: string,
    isPrimary?: boolean,
    sortOrder?: number
  ): Promise<boolean> {
    try {
      const res = await axios.post(
        `${API_URL}/items/${itemId}/images`,
        {
          imageUrl,
          isPrimary,
          sortOrder,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.success;
    } catch (error) {
      console.error("Error adding image:", error);
      return false;
    }
  },

  async deleteImage(
    token: string,
    imageId: number
  ): Promise<boolean> {
    try {
      const res = await axios.delete(
        `${API_URL}/images/${imageId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.success;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  },
};