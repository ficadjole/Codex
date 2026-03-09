import type { AccessoryValidationErrors } from "./AccessoryValidationErrors"

export type AccessoryValidationResult = {
    success: boolean
    errors: AccessoryValidationErrors
}