import type { RezultatValidacije } from "../../../types/validation/ValidationResult";

export function validacijaPodatakaAuthPrijava(korisnickoIme?: string, lozinka?: string): RezultatValidacije {
 var poruka: string = "";

  // Validacija username-a
  if (!korisnickoIme || korisnickoIme.trim() === "") {
    poruka = "Username ne sme biti prazan.";
  } else if (korisnickoIme.length < 3) {
    poruka = "Username mora imati najmanje 3 karaktera.";
  } else if (korisnickoIme.length > 15) {
    poruka = "Username ne sme imati više od 15 karaktera.";
  }

  // Validacija password-a
  if (!lozinka || lozinka.trim() === "") {
    poruka = "Password ne sme biti prazan.";
  } else if (lozinka.length < 3) {
    poruka = "Password mora imati najmanje 3 karaktera.";
  } else if (lozinka.length > 15) {
    poruka = "Password ne sme imati više od 15 karaktera.";
  }

  return {
    uspesno: poruka.length === 0,
    poruka,
  };
}