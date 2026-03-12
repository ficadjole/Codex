export interface AccessoryUpdateDto {
    itemId: number

    name: string
    price: number
    description: string
    content: string

    type: "aksesoar"

    discountPercent?: number
    discountFrom?: string
    discountTo?: string
}