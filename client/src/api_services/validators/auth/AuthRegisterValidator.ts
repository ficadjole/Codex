import type { RezultatValidacije } from "../../../types/validation/ValidationResult";

export function validacijaPodatakaAuthRegistracija(
    ime?: string,
    prezime?: string,
    email?: string,
    korisnickoIme?: string,
    lozinka?: string,
    uloga?: string 
): RezultatValidacije{
    
    if(!ime || !prezime || !email || !korisnickoIme || !lozinka || !uloga){
        return { uspesno: false, poruka: "Sva polja su obavezna"};
    }

    if(ime.length < 3 || ime.length > 15)
        return {uspesno: false, poruka: "Ime mora imati najmanje 3 a najvise 15 karaktera."};    

    if(prezime.length < 3 || prezime.length > 15) 
        return {uspesno: false, poruka: "Prezime mora imati najmanje 3 a najvise 15 karaktera."};

    if(lozinka.length < 3 || lozinka.length > 15)
        return{ uspesno: false, poruka: "Lozinka mora imati najmanje 3 a najvise 15 karaktera."}

   if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return { uspesno: false, poruka: "Email nije validan."};
    }

    if(korisnickoIme.length < 3 || korisnickoIme.length > 15){
        return { uspesno: false, poruka: "Korisničko ime mora imati najmanje 3 a najvise 15 karaktera."};
    }

    if(!["kupac", "admin"].includes(uloga)){
        return { uspesno: false, poruka: "Uloga nije validna."};
    }

    return {uspesno: true};
}