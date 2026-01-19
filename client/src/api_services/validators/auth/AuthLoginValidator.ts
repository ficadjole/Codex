import type { ValidationReusult } from "../../../types/validation/ValidationResult";

export function validateAuthLoginData(
  username?: string,
  password?: string
): ValidationReusult {
  let message: string = "";

  // Username validation
  if (!username || username.trim() === "") {
    message = "Username must not be empty.";
  } else if (username.length < 3) {
    message = "Username must have at least 3 characters.";
  } else if (username.length > 15) {
    message = "Username must not exceed 15 characters.";
  }

  // Password validation
  if (!password || password.trim() === "") {
    message = "Password must not be empty.";
  } else if (password.length < 3) {
    message = "Password must have at least 3 characters.";
  } else if (password.length > 15) {
    message = "Password must not exceed 15 characters.";
  }

  return {
    success: message.length === 0,
    message,
  };
}
