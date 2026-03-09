import type { DiscountValidationErrors } from "../../../types/validation/DiscountValidationErrors"

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

        if (fromDate < today) {
            errors.discountFrom = "Popust ne može početi u prošlosti."
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