import type { BookValidationErrors } from "../../../types/validation/book/BookValidationErrors";
import type { BookValidationResult } from "../../../types/validation/book/BookValidationResult";
import { validateDiscount } from "../discountComponent/DiscountValidator";

export function validateBookCreateData(
    name?: string,
    author?: string,
    isbn?: string,
    price?: number | null,
    pages?: number | null,
    description?: string,
    publicationYear?: number | null,
    genreIds?: number[],
    goodreadsLink?: string,
    discountPercent?: number | null,
    discountFrom?: string,
    discountTo?: string
): BookValidationResult {

    const errors: BookValidationErrors = {}

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!name || name.trim() === "") {
        errors.name = "Naziv knjige je obavezan.";
    }

    else if (name.trim().length < 2) {
        errors.name = "Naziv mora imati bar 2 karaktera.";
    }

    else if (name.length > 255) {
        errors.name = "Naziv može imati najviše 255 karaktera.";
    }

    if (!author || author.trim() === "") {
        errors.author = "Autor je obavezan.";
    }
    //author.trim() zato sto bi inace mogao da prodje ako unese razmake
    else if (author.trim().length > 255) {
        errors.author = "Ime autora je predugačko.";
    }

    if (!isbn || isbn.trim() === "") {
        errors.isbn = "ISBN je obavezan.";
    }

    else if (isbn.length > 50) {
        errors.isbn = "ISBN može imati najviše 50 karaktera.";
    }

    if (price === null || price === undefined) {
        errors.price = "Cena je obavezna."
    }
    else if (price <= 0) {
        errors.price = "Cena mora biti veća od 0."
    }

    else if (price > 1000000) {
        errors.price = "Cena nije realna.";
    }

    if (pages === null || pages === undefined) {
        errors.pages = "Broj strana je obavezan."
    }
    else if (pages <= 0) {
        errors.pages = "Broj strana mora biti veći od 0."
    }

    else if (pages > 10000) {
        errors.pages = "Broj strana nije validan.";
    }

    if (!description || description.trim() === "") {
        errors.description = "Opis knjige je obavezan.";
    }

    else if (description.length < 10) {
        errors.description = "Opis mora imati bar 10 karaktera.";
    }

    if (publicationYear === null || publicationYear === undefined) {
        errors.publicationYear = "Godina izdanja je obavezna."
    }

    else if (publicationYear < 1500 || publicationYear > new Date().getFullYear()) {
        errors.publicationYear = "Godina izdanja nije validna.";
    }

    if (goodreadsLink && goodreadsLink.trim() !== "") {
        try {
            new URL(goodreadsLink);
        } catch {
            errors.goodreadsLink = "Goodreads link nije validan URL.";
        }
    }

    if (!genreIds || genreIds.length === 0) {
        errors.genreIds = "Morate izabrati bar jedan žanr.";
    }

    Object.assign(
        errors,
        validateDiscount(discountPercent, discountFrom, discountTo)
    )

    return {
        success: Object.keys(errors).length === 0,
        errors
    };
}