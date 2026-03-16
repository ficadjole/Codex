import axios from "axios";
import type { IItemImageApiService } from "./IItemImageApiService";
import type { ItemImageCreateDto } from "../../models/item/create/ItemImageCreateDto";

const API_URL: string = import.meta.env.VITE_API_URL + "itemImages";

export const itemImageApi: IItemImageApiService = {
  async addImage(
    token: string,
    itemId: number,
    image: ItemImageCreateDto
  ): Promise<boolean> {
    try {
      const res = await axios.post(
        `${API_URL}/items/${itemId}/images`,
        image,
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