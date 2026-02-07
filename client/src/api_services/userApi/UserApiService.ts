import axios from "axios";
import { emptyUser, type UserDto } from "../../models/users/UserDto";
import type { IUsersApiService } from "./IUserApiService";

const API_URL: string = import.meta.env.VITE_API_URL + "user";


export const usersApi: IUsersApiService = {
    async getUserById(token: string, userId: number): Promise<UserDto> {
        try{
            const res = await axios.get<UserDto>(`${API_URL}s/get/${userId}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            return res.data;
        } catch (error){
            console.error("Error fetching user by ID: ", error);
            return emptyUser;
        }
    },

    async updateUser(token: string, userId: number, user: UserDto) {
        try{
            const res = await axios.put<UserDto>(`${API_URL}s/update/${userId}`,  user, {
                headers: { Authorization: `Bearer ${token}` 
                },
            });
            return res.data;
        } catch(error){
            console.error("Error updating user:", error);
            return emptyUser;
        }
    },
}