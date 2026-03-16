import { AuthValidType } from "../../../Domain/types/AuthValidType";

export function validateAuthDataLogin(
  username: string,
  password: string
): AuthValidType {
  let message: string = "";

  // Username validation
  if (!username || username.trim() === "") {
    message = "Korisničko ime ne sme biti prazno.";
  } else if (username.length < 3) {
    message = "Korisničko ime mora imati najmanje 3 karaktera.";
  } else if (username.length > 15) {
    message = "Korisničko ime ne sme imati više od 15 karaktera.";
  }

  // Password validation
  if (!password || password.trim() === "") {
    message = "Lozinka ne sme biti prazna.";
  } else if (password.length < 3) {
    message = "Lozinka mora imati najmanje 3 karaktera.";
  } else if (password.length > 15) {
    message = "Lozinka ne sme imati više od 15 karaktera.";
  }

  return {
    success: message.length === 0,
    message,
  };
}
