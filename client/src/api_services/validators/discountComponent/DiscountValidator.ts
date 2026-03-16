import type { DiscountValidationErrors } from "../../../types/validation/discount/DiscountValidationErrors"

export function validateDiscount(
    discountPercent?: number | null,
    discountFrom?: string,
    discountTo?: string
): DiscountValidationErrors {

    const errors: DiscountValidationErrors = {}

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (discountPercent !== null && discountPercent !== undefined) {

        if (discountPercent <= 0 || discountPercent > 90) {
            errors.discountPercent = "Popust mora biti između 1% i 90%."
        }

        if (!discountFrom) {
            errors.discountFrom = "Morate uneti datum početka popusta."
        }

        if (!discountTo) {
            errors.discountTo = "Morate uneti datum kraja popusta."
        }

    }

    if (discountFrom) {

        const fromDate = new Date(discountFrom)
        fromDate.setHours(0, 0, 0, 0)

        if (fromDate < today) {
            errors.discountFrom = "Datum početka ne može biti u prošlosti."
        }

    }

    if (discountTo) {

        const toDate = new Date(discountTo)
        toDate.setHours(0, 0, 0, 0)

        if (toDate < today) {
            errors.discountTo = "Datum kraja ne može biti u prošlosti."
        }

    }

    if (discountFrom && discountTo) {

        const fromDate = new Date(discountFrom)
        const toDate = new Date(discountTo)

        if (toDate <= fromDate) {
            errors.discountTo = "Datum kraja mora biti posle početka."
        }

    }

    return errors
}