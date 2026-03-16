import type { DiscountValidationErrors } from "./DiscountValidationErrors"

export type DiscountValidationResult = {
  success: boolean
  errors : DiscountValidationErrors
}