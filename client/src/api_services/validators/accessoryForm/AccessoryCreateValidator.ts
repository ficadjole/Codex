import type { AccessoryValidationErrors } from "../../../types/validation/accessory/AccessoryValidationErrors"
import type { AccessoryValidationResult } from "../../../types/validation/accessory/AccessoryValidationResult"
import { validateDiscount } from "../discountComponent/DiscountValidator"


export function validateAccessoryCreateData(
    name?: string,
    price?: number | null,
    description?: string,
    content?: string,
    discountPercent?: number | null,
    discountFrom?: string,
    discountTo?: string
): AccessoryValidationResult {

    const errors: AccessoryValidationErrors = {}

    if (!name || name.trim() === "") {
        errors.name = "Naziv proizvoda je obavezan."
    }
    else if (name.trim().length < 2) {
        errors.name = "Naziv mora imati bar 2 karaktera."
    }
    else if (name.length > 255) {
        errors.name = "Naziv može imati najviše 255 karaktera."
    }

    if (price === null || price === undefined) {
        errors.price = "Cena je obavezna."
    }
    else if (price <= 0) {
        errors.price = "Cena mora biti veća od 0."
    }
    else if (price > 1000000) {
        errors.price = "Cena nije realna."
    }

    if (!description || description.trim() === "") {
        errors.description = "Opis proizvoda je obavezan."
    }
    else if (description.length < 5) {
        errors.description = "Opis mora imati bar 5 karaktera."
    }
    else if (description.length > 2000) {
        errors.description = "Opis je predugačak."
    }

    if (!content || content.trim() === "") {
        errors.content = "Sadržaj pakovanja je obavezan."
    }
    else if (content.length < 3) {
        errors.content = "Sadržaj mora imati bar 3 karaktera."
    }
    else if (content.length > 1000) {
        errors.content = "Sadržaj pakovanja je predugačak."
    }

    Object.assign(
        errors,
        validateDiscount(discountPercent, discountFrom, discountTo)
    )

    return {
        success: Object.keys(errors).length === 0,
        errors
    }
}