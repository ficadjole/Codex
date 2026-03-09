import type { BookValidationErrors } from "./BookValidationErrors"

export type BookValidationResult = {
  success: boolean
  errors : BookValidationErrors
}