import type { DiscountValidationErrors } from "../DiscountValidationErrors"

export type AccessoryValidationErrors = DiscountValidationErrors & {
    name            ?: string
    price           ?: string
    description     ?: string
    content         ?: string
}