import { AuthValidType } from "../../../Domain/types/AuthValidType";

export function validateAuthDataLogin(
  username: string,
  password: string
): AuthValidType {
  let message: string = "";

  // Username validation
  if (!username || username.trim() === "") {
    message = "Username cannot be empty.";
  } else if (username.length < 3) {
    message = "Username must be at least 3 characters long.";
  } else if (username.length > 15) {
    message = "Username cannot be longer than 15 characters.";
  }

  // Password validation
  if (!password || password.trim() === "") {
    message = "Password cannot be empty.";
  } else if (password.length < 3) {
    message = "Password must be at least 3 characters long.";
  } else if (password.length > 15) {
    message = "Password cannot be longer than 15 characters.";
  }

  return {
    success: message.length === 0,
    message,
  };
}
