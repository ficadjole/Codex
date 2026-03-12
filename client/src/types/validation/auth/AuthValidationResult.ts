import type { AuthValidationErrors } from "./AuthValidationErrors"

export type AuthValidationResult = {
  success: boolean
  errors : AuthValidationErrors
}