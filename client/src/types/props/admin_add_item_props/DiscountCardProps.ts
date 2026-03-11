import type { DiscountValidationErrors } from "../../validation/discount/DiscountValidationErrors"

export type DiscountCardProps = {
    discountPercent: number | null
    setDiscountPercent: (v: number | null) => void
    discountFrom: string
    setDiscountFrom: (v: string) => void
    discountTo: string
    setDiscountTo: (v: string) => void
    errors : DiscountValidationErrors
}