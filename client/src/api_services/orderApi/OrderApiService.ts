import axios from "axios";
import type { IOrderApiService } from "./IOrderApiService";
import type { OrderResponseDto } from "../../models/order/OrderResponseDto";
import type { OrderDetailsResponseDto } from "../../models/order/OrderDetailsResponseDto";

const API_URL: string = import.meta.env.VITE_API_URL + "order";

export const orderApi: IOrderApiService = {

    async getAllOrders(token: string): Promise<OrderResponseDto[]> {
        try {
            const response = await axios.get(`${API_URL}/getAllOrders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching items:", error);
            return [];
        }
    },
    async getMyOrders(token: string): Promise<OrderResponseDto[]> {
        try {
            const response = await axios.get(`${API_URL}/getMyOrders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching items:", error);
            return [];
        }
    },
    async getOrderById(token: string, orderId: number): Promise<OrderResponseDto> {
        try {
            const response = await axios.get(`${API_URL}/getOrderById/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.data;
        } catch (error) {
            console.error("Error fetching item:", error);
            return {} as OrderResponseDto;
        }
    },
    async getFullDetails(
        orderId: number,
        token: string
    ): Promise<OrderDetailsResponseDto> {
        try {
            const response = await axios.get(
                `${API_URL}/getFullDetails/${orderId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return response.data.data;
        } catch (error) {
            console.error("Error fetching order details:", error);
            return {} as OrderDetailsResponseDto;
        }
    },
    async changeStatus(
        token: string,
        orderId: number,
        status: string
    ): Promise<boolean> {
        try {
            await axios.put(
                `${API_URL}/changeStatus/${orderId}`,
                { status },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return true;
        } catch {
            return false;
        }
    },
    async deleteOrder(token: string, orderId: number): Promise<boolean> {
        try {
            await axios.delete(`${API_URL}/deleteOrder/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return true;
        } catch {
            return false;
        }
    }
}