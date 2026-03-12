import type { AuthValidationErrors } from "../../../types/validation/auth/AuthValidationErrors";
import type { AuthValidationResult } from "../../../types/validation/auth/AuthValidationResult";

export function validateAuthRegistrationData(
  firstName?: string,
  lastName?: string,
  email?: string,
  username?: string,
  password?: string,
  userRole?: string
): AuthValidationResult {

  const errors: AuthValidationErrors = {}

  if (!firstName || firstName.trim() === "") {
    errors.firstName = "Ime je obavezno."
  }
  else if (firstName.length < 2 || firstName.length > 50) {
    errors.firstName = "Ime mora imati između 2 i 50 karaktera."
  }

  if (!lastName || lastName.trim() === "") {
    errors.lastName = "Prezime je obavezno."
  }
  else if (lastName.length < 2 || lastName.length > 50) {
    errors.lastName = "Prezime mora imati između 2 i 50 karaktera."
  }

  if (!email || email.trim() === "") {
    errors.email = "Email je obavezan."
  }
  else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    errors.email = "Email nije validan."
  }

  if (!username || username.trim() === "") {
    errors.username = "Korisničko ime je obavezno."
  }
  else if (username.length < 3 || username.length > 15) {
    errors.username = "Korisničko ime mora imati između 3 i 15 karaktera."
  }

  if (!password || password.trim() === "") {
    errors.password = "Lozinka je obavezna."
  }
  else if (password.length < 3 || password.length > 15) {
    errors.password = "Lozinka mora imati između 3 i 15 karaktera."
  }

  if (!["user", "admin"].includes(userRole ?? "")) {
    errors.username = "Uloga nije validna."
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  }
}