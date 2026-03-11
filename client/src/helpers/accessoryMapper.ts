import type { AccessoryCreateDto } from "../models/item/AccessoryCreateDto"
import type { AccessoryDetailsDto } from "../models/item/AccessoryDetailsDto"
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

export function mapToAccessoryUpdateDto(
    data: MapAccessoryParams,
    itemId: number
): AccessoryDetailsDto {

    const discount = mapDiscount(
        data.discountPercent,
        data.discountFrom,
        data.discountTo
    )

    return {
        itemId,
        name: data.name,
        price: data.price!,
        description: data.description,
        content: data.content,
        type: "aksesoar",
        primaryImageUrl: "",
        images: [],
        discountPercent: discount.discountPercent ?? undefined,
        discountFrom: discount.discountFrom ?? undefined,
        discountTo: discount.discountTo ?? undefined
    }
}