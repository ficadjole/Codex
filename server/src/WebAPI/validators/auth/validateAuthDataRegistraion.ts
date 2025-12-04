import { UserRole } from "../../../Domain/enums/UserRole";
import { AuthValidType } from "../../../Domain/types/AuthValidType";

export function validateAuthDataRegistraion(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  userRole: UserRole
): AuthValidType {
  if (firstName.trim() === "") {
    return { success: false, message: "Please enter your first name!" };
  } else if (firstName.length < 3 || firstName.length > 15) {
    return {
      success: false,
      message: "First name must be between 3 and 15 characters.",
    };
  }

  if (lastName.trim() === "") {
    return { success: false, message: "Please enter your last name!" };
  } else if (lastName.length < 3 || lastName.length > 15) {
    return {
      success: false,
      message: "Last name must be between 3 and 15 characters.",
    };
  }

  if (username.trim() === "") {
    return { success: false, message: "Please enter a username!" };
  } else if (username.length < 3 || username.length > 15) {
    return {
      success: false,
      message: "Username must be between 3 and 15 characters.",
    };
  }

  if (password.trim() === "") {
    return { success: false, message: "Please enter a password!" };
  } else if (password.length < 3 || password.length > 15) {
    return {
      success: false,
      message: "Password must be between 3 and 15 characters.",
    };
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/)) {
    return {
      success: false,
      message: "Invalid email format!",
    };
  }

  if (userRole !== UserRole.USER && userRole !== UserRole.ADMIN) {
    return {
      success: false,
      message: "You must select a role.",
    };
  }

  return {
    success: true,
    message: "You have successfully registered.",
  };
}
