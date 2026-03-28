import { CartDetails } from "../../DTOs/cart/CartDetails";

export interface ICartService {
  getCart(userId: number): Promise<CartDetails[]>;

  getCartItemCount(userId: number): Promise<number>;

  addToCart(userId: number, itemId: number, quantity: number): Promise<boolean>;

  updateQuantity(
    userId: number,
    itemId: number,
    quantity: number,
  ): Promise<boolean>;

  removeFromCart(userId: number, itemId: number): Promise<boolean>;

  clearCart(userId: number): Promise<boolean>;
}
