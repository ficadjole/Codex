import { Item } from "../models/Item";

function isDiscountActive(item: Item): boolean {
  if (item.discountPercent == null) return false;

  const today = new Date();

  if (item.discountFrom && new Date(item.discountFrom) > today) return false;
  if (item.discountTo && new Date(item.discountTo) < today) return false;

  return true;
}

export function getFinalPrice(item: Item): number {
  return isDiscountActive(item)
    ? item.price * (1 - item.discountPercent! / 100)
    : item.price;
}
