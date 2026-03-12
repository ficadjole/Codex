import axios from "axios";
import type { IItemApiService } from "./IItemApiService";
import type { ItemDto } from "../../models/item/ItemDto";
import type { BookDetailsDto } from "../../models/item/details/BookDetailsDto";
import type { BookCreateDto } from "../../models/item/create/BookCreateDto";
import type { AccessoryCreateDto } from "../../models/item/create/AccessoryCreateDto";
import type { BookUpdateDto } from "../../models/item/update/BookUpdateDto";
import type { AccessoryDetailsDto } from "../../models/item/details/AccessoryDetailsDto";
import type { AccessoryUpdateDto } from "../../models/item/update/AccessoryUpdateDto";

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
  async getBook(itemId: number): Promise<BookDetailsDto> {
    try {
      const res = await axios.get(`${API_URL}/getBook/${itemId}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching book:", error);
      return {} as BookDetailsDto;
    }
  },

  async getAccessory(itemId: number): Promise<AccessoryDetailsDto> {
    try {
      const res = await axios.get(`${API_URL}/getAccessory/${itemId}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching accessory:", error);
      return {} as AccessoryDetailsDto;
    }
  },
  async addBook(
    token: string,
    book: BookCreateDto
  ): Promise<number> {

    try {

      const payload = {
        ...book,
        type: "knjiga"
      }

      const res = await axios.post(
        `${API_URL}/addItem`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      return res.data?.data?.itemId ?? 0

    } catch (error) {
      console.error("Error adding item:", error)
      return 0
    }
  },
  async addAccessory(
    token: string,
    accessory: AccessoryCreateDto
  ): Promise<number> {
    try {
      const payload = {
        ...accessory,
        type: "aksesoar"
      }
      const res = await axios.post(
        `${API_URL}/addItem`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      return res.data?.data?.itemId ?? 0
      
    } catch (error) {
      console.error("Error adding accessory:", error)
      return 0
    }

  },
  async updateItem(
    token: string,
    itemId: number,
    item: ItemDto | BookUpdateDto | AccessoryUpdateDto
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