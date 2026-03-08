export interface AccessoryCreateDto {
    name                : string
    price               : number
    description         : string
    content             : string

    discountPercent     ?: number | null
    discountFrom        ?: string | null
    discountTo          ?: string | null
}