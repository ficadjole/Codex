import { Cart } from "../models/Cart";

export interface ICartRepository {
  create(userId: number): Promise<Cart>;
  getByUserId(userId: number): Promise<Cart>;
  delete(cartId: number): Promise<boolean>;
}
