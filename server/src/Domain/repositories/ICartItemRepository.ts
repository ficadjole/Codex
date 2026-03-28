import { CartDetails } from "../DTOs/cart/CartDetails";
import { CartItem } from "../models/CartItem";

export interface ICartItemRepository {
  addItem(cartId: number, itemId: number, quantity: number): Promise<boolean>;

  getByCartId(cartId: number): Promise<CartItem[]>;

  updateQuantity(
    cartId: number,
    itemId: number,
    quantity: number,
  ): Promise<boolean>;

  removeItem(cartId: number, itemId: number): Promise<boolean>;

  clearCart(cartId: number): Promise<boolean>;

  getCartDetails(userId: number): Promise<CartDetails[]>;

  getCartItemCount(userId: number): Promise<number>;
}
