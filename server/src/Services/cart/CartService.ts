import { CartRepository } from "../../Database/repositories/cart/CartRepository";
import { CartItemRepository } from "../../Database/repositories/cartItem/CartItemRepository";
import { CartDetails } from "../../Domain/DTOs/cart/CartDetails";

export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository,
  ) {}

  async getCart(userId: number): Promise<CartDetails[]> {
    return await this.cartItemRepository.getCartDetails(userId);
  }

  async getCartItemCount(userId: number): Promise<number> {
    return await this.cartItemRepository.getCartItemCount(userId);
  }

  async addToCart(
    userId: number,
    itemId: number,
    quantity: number = 1,
  ): Promise<boolean> {
    var cart = await this.cartRepository.getByUserId(userId);

    if (!cart.cartId) {
      cart = await this.cartRepository.create(userId);
    }

    return await this.cartItemRepository.addItem(cart.cartId, itemId, quantity);
  }

  async updateQuantity(
    userId: number,
    itemId: number,
    quantity: number,
  ): Promise<boolean> {
    const cart = await this.cartRepository.getByUserId(userId);

    if (!cart.cartId) return false;

    if (quantity <= 0) {
      return await this.cartItemRepository.removeItem(cart.cartId, itemId);
    }

    return await this.cartItemRepository.updateQuantity(
      cart.cartId,
      itemId,
      quantity,
    );
  }

  async removeFromCart(userId: number, itemId: number): Promise<boolean> {
    const cart = await this.cartRepository.getByUserId(userId);

    if (!cart.cartId) return false;

    return await this.cartItemRepository.removeItem(cart.cartId, itemId);
  }

  async clearCart(userId: number): Promise<boolean> {
    const cart = await this.cartRepository.getByUserId(userId);

    if (!cart.cartId) return false;

    return await this.cartItemRepository.clearCart(cart.cartId);
  }
}
