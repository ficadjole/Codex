import type { AccessoryCreateDto } from "../models/item/AccessoryCreateDto"
import { mapDiscount } from "./discountMapper"

interface MapAccessoryParams {
    name: string
    price: number | null
    description: string
    content: string
    discountPercent: number | null
    discountFrom: string
    discountTo: string
}

export function mapToAccessoryDto(data: MapAccessoryParams): AccessoryCreateDto {
    return {
        name: data.name,
        price: data.price!,
        description: data.description,
        content: data.content,
        ...mapDiscount(data.discountPercent, data.discountFrom, data.discountTo)
    }
}