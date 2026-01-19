import type { ValidationReusult } from "../../../types/validation/ValidationResult";

export function validateAuthRegistrationData(
  firstName?: string,
  lastName?: string,
  email?: string,
  username?: string,
  password?: string,
  userRole?: string
): ValidationReusult {

  if (!firstName || !lastName || !email || !username || !password || !userRole) {
    return { success: false, message: "All fields are required." };
  }

  if (firstName.length < 3 || firstName.length > 15) {
    return {
      success: false,
      message: "First name must be between 3 and 15 characters."
    };
  }

  if (lastName.length < 3 || lastName.length > 15) {
    return {
      success: false,
      message: "Last name must be between 3 and 15 characters."
    };
  }

  if (password.length < 3 || password.length > 15) {
    return {
      success: false,
      message: "Password must be between 3 and 15 characters."
    };
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    return {
      success: false,
      message: "Email is not valid."
    };
  }

  if (username.length < 3 || username.length > 15) {
    return {
      success: false,
      message: "Username must be between 3 and 15 characters."
    };
  }

  if (!["user", "admin"].includes(userRole)) {
    return {
      success: false,
      message: "Role is not valid."
    };
  }

  return { success: true };
}
