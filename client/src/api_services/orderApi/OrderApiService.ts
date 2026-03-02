import axios from "axios";
import type { IOrderApiService } from "./IOrderApiService";
import type { OrderResponseDto } from "../../models/order/OrderResponseDto";

const API_URL: string = import.meta.env.VITE_API_URL + "order";

export class OrderApiService implements IOrderApiService {

  async getAllOrders(token:string): Promise<OrderResponseDto[]> {
    try{
        const response = await axios.get(`${API_URL}/getAllOrders` , {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data.data;
    } catch (error){
        console.error("Error fetching items:", error);
        return [];
    }
  }

  async getMyOrders(token:string): Promise<OrderResponseDto[]> {
    try{
        const response = await axios.get(`${API_URL}/getMyOrders`, {
                headers: {Authorization: `Bearer ${token}`},
            });
        return response.data.data;
    } catch(error){
        console.error("Error fetching items:", error);
        return [];
    }
  }

  async getOrderById(orderId: number): Promise<OrderResponseDto> {
    try {
      const response = await axios.get(`${API_URL}/getOrderById/${orderId}`, {
        withCredentials: true
      });
      return response.data.data;
    } catch (error) {
        console.error("Error fetching item:", error);
        return {} as OrderResponseDto;
    }
  }

  async deleteOrder(orderId: number): Promise<boolean> {
    try {
      await axios.delete(`${API_URL}/deleteOrder/${orderId}`, {
        withCredentials: true
      });
      return true;
    } catch {
      return false;
    }
  }
}