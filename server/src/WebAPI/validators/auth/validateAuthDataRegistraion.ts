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
    return { success: false, message: "Unesite ime!" };
  } else if (firstName.length < 3 || firstName.length > 15) {
    return {
      success: false,
      message: "Ime mora imati između 3 i 15 karaktera.",
    };
  }

  if (lastName.trim() === "") {
    return { success: false, message: "Unesite prezime!" };
  } else if (lastName.length < 3 || lastName.length > 15) {
    return {
      success: false,
      message: "Prezime mora imati između 3 i 15 karaktera.",
    };
  }

  if (username.trim() === "") {
    return { success: false, message: "Unesite korisničko ime!" };
  } else if (username.length < 3 || username.length > 15) {
    return {
      success: false,
      message: "Korisničko ime mora imati između 3 i 15 karaktera.",
    };
  }

  if (password.trim() === "") {
    return { success: false, message: "Unesite lozinku!" };
  } else if (password.length < 3 || password.length > 15) {
    return {
      success: false,
      message: "Lozinka mora imati između 3 i 15 karaktera.",
    };
  }

  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/)) {
    return {
      success: false,
      message: "Email nije u ispravnom formatu.",
    };
  }

  if (userRole !== UserRole.USER && userRole !== UserRole.ADMIN) {
    return {
      success: false,
      message: "Morate izabrati ulogu.",
    };
  }

  return {
    success: true,
    message: "Uspešno ste se registrovali.",
  };
}
