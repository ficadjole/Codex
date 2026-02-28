import axios from "axios";
import type { IItemApiService } from "./IItemApiService";
import type { ItemDto } from "../../models/item/ItemDto";

const API_URL: string = import.meta.env.VITE_API_URL + "item";

export const itemApi: IItemApiService = {

  async getAllItems(): Promise<ItemDto[]> {
    try {
      const res = await axios.get(`${API_URL}/getAllItems`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  },

  async getItemById(itemId: number): Promise<ItemDto> {
    try {
      const res = await axios.get(`${API_URL}/getItemById/${itemId}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching item:", error);
      return {} as ItemDto;
    }
  },

  async getItemsByType(type: string): Promise<ItemDto[]> {
    try {
      const res = await axios.get(`${API_URL}/getItemsByType/${type}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching items by type:", error);
      return [];
    }
  },

  async addItem(token: string, item: ItemDto): Promise<boolean> {
    try {
      await axios.post(`${API_URL}/addItem`, item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.error("Error adding item:", error);
      return false;
    }
  },

  async updateItem(
    token: string,
    itemId: number,
    item: ItemDto
  ): Promise<boolean> {
    try {
      await axios.put(`${API_URL}/updateItem/${itemId}`, item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.error("Error updating item:", error);
      return false;
    }
  },

  async deleteItem(token: string, itemId: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/deleteItem/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      return false;
    }
  },

  async addDiscount(
    token: string,
    itemId: number,
    discountPercent: number,
    discountFrom: string,
    discountTo: string
  ): Promise<boolean> {
    try {
      await axios.put(
        `${API_URL}/addDiscount/${itemId}`,
        {
          discountPercent,
          discountFrom,
          discountTo,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return true;
    } catch (error) {
      console.error("Error adding discount:", error);
      return false;
    }
  },
};