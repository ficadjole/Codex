import type { AccessoryCreateDto } from "../models/item/create/AccessoryCreateDto"
import type { AccessoryUpdateDto } from "../models/item/update/AccessoryUpdateDto"
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
): AccessoryUpdateDto {

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

        discountPercent: discount.discountPercent ?? undefined,
        discountFrom: discount.discountFrom ?? undefined,
        discountTo: discount.discountTo ?? undefined
    }
}