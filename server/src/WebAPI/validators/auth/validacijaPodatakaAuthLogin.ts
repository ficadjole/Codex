import { AuthValidType } from "../../../Domain/types/AuthValidType";

export function validacijaPodatakaAuthLogin(
  username: string,
  password: string
): AuthValidType {
  var poruka: string = "";

  // Validacija username-a
  if (!username || username.trim() === "") {
    poruka = "Username ne sme biti prazan.";
  } else if (username.length < 3) {
    poruka = "Username mora imati najmanje 3 karaktera.";
  } else if (username.length > 15) {
    poruka = "Username ne sme imati više od 15 karaktera.";
  }

  // Validacija password-a
  if (!password || password.trim() === "") {
    poruka = "Password ne sme biti prazan.";
  } else if (password.length < 3) {
    poruka = "Password mora imati najmanje 3 karaktera.";
  } else if (password.length > 15) {
    poruka = "Password ne sme imati više od 15 karaktera.";
  }

  return {
    uspesno: poruka.length === 0,
    poruka,
  };
}
