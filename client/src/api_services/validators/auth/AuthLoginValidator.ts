import type { AuthValidationErrors } from "../../../types/validation/auth/AuthValidationErrors";
import type { AuthValidationResult } from "../../../types/validation/auth/AuthValidationResult";

export function validateAuthLoginData(
  username?: string,
  password?: string
): AuthValidationResult {

  const errors: AuthValidationErrors = {}

  if (!username || username.trim() === "") {
    errors.username = "Korisničko ime je obavezno."
  }
  else if (username.length < 3) {
    errors.username = "Korisničko ime mora imati najmanje 3 karaktera."
  }
  else if (username.length > 15) {
    errors.username = "Korisničko ime može imati najviše 15 karaktera."
  }

  if (!password || password.trim() === "") {
    errors.password = "Lozinka je obavezna."
  }
  else if (password.length < 3) {
    errors.password = "Lozinka mora imati najmanje 3 karaktera."
  }
  else if (password.length > 15) {
    errors.password = "Lozinka može imati najviše 15 karaktera."
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  }
}