import { Uloga } from "../../../Domain/enums/Uloga";
import { AuthValidType } from "../../../Domain/types/AuthValidType";

export function validacijaPodatakaAuth(
  ime: string,
  prezime: string,
  username: string,
  email: string,
  password: string,
  uloga: Uloga
): AuthValidType {
  if (ime.trim() === "") {
    return { uspesno: false, poruka: "Molim Vas unesite ime!" };
  } else if (ime.length < 3 || ime.length > 15) { //ovde sam promenila ime.length < 3 && ime.length > 15 sa || jer fizicki nemoguce da oba uslova budu zadovoljena
    return {
      uspesno: false,
      poruka: "Duzina imena mora biti između 3 i 15 karaktera",
    };
  }

  if (prezime.trim() === "") {
    return { uspesno: false, poruka: "Molim Vas unesite prezime!" };
  } else if (prezime.length < 3 || prezime.length > 15) {
    return {
      uspesno: false,
      poruka: "Duzina prezimena mora biti između 3 i 15 karaktera",
    };
  }

  if (username.trim() === "") {
    return { uspesno: false, poruka: "Molim Vas unesite korisnicko ime!" };
  } else if (username.length < 3 || username.length > 15) {
    return {
      uspesno: false,
      poruka: "Duzina korisnickog imena mora biti između 3 i 15 karaktera",
    };
  }

  if (password.trim() === "") {
    return { uspesno: false, poruka: "Molim Vas unesite sifru!" };
  } else if (password.length < 3 || password.length > 15) {
    return {
      uspesno: false,
      poruka: "Duzina sifre mora biti između 3 i 15 karaktera",
    };
  }

  //if (email.match("[a-zA-Z0-9]+@[a-z]+.com") === null) { //ovo tvoje ne radi dobro kao prvo, tacku nisi stavio \ ispred da nije specijalan karakter
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) { //OPCIJA 1 prihavata sve mejlove ne samo koje se zavrsavaju na .com
  //if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/)) { //OPCIJA 2 prihvata mejlove samo .com
    return {
      uspesno: false,
      poruka: "Niste uneli email u dobrom formatu!",
    };
  }

  if (uloga != Uloga.kupac && uloga != Uloga.admin) {
    return {
      uspesno: false,
      poruka: "Niste izabrali ulogu",
    };
  }

  return {
    uspesno: true,
    poruka: "Uspesno ste se prijavili",
  };
}
