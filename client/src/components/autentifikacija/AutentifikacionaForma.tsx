import { use, useState } from "react";
import { SačuvajVrednostPoKljuču } from "../../helpers/local_storage";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validacijaPodatakaAuthPrijava } from "../../api_services/validators/auth/AuthLoginValidator";
import { validacijaPodatakaAuthRegistracija } from "../../api_services/validators/auth/AuthRegisterValidator";

export default function AutentifikacionaForma({
  authApi,
  onLoginSuccess,
}: AuthFormProps) {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [uloga, setUloga] = useState("kupac");
  const [greska, setGreska] = useState("");
  const [jeRegistracija, setJeRegistracija] = useState(false);

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();
    setGreska("");

    let validacija;

    if (jeRegistracija) {
      //validacija registracije
      validacija = validacijaPodatakaAuthRegistracija(
        ime,
        prezime,
        email,
        korisnickoIme,
        password,
        uloga
      );
    } else {
      //validacija prijave
      validacija = validacijaPodatakaAuthPrijava(korisnickoIme, password);
    }

    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Neispravni podaci");
      return;
    }

    try {
      let odgovor;
      if (jeRegistracija) {
        odgovor = await authApi.registracija(
          ime,
          prezime,
          email,
          korisnickoIme,
          password,
          uloga
        );
      } else {
        odgovor = await authApi.prijava(korisnickoIme, password);
      }

      if (odgovor.success && odgovor.data) {
        //backend vraca jwt token
        SačuvajVrednostPoKljuču("authToken", odgovor.data);
        onLoginSuccess();
      } else {
        setGreska(odgovor.message);
      }
    } catch (error) {
      setGreska("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  return (
    <div className="form-container">
      <h1>{jeRegistracija ? "Registracija" : "Prijava"}</h1>

      <form onSubmit={podnesiFormu}>
        {jeRegistracija && (
          <>
            <div className="input-group">
              <label htmlFor="ime">Ime:</label>
              <input
                id="ime"
                type="text"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                placeholder="Unesite ime"
                required
                minLength={3}
                maxLength={15}
              />
            </div>

            <div className="input-group">
              <label htmlFor="prezime">Prezime:</label>
              <input
                id="prezime"
                type="text"
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                placeholder="Unesite prezime"
                required
                minLength={3}
                maxLength={15}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Unesite email"
                required
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label htmlFor="korisnickoIme">Korisnicko ime:</label>
          <input
            id="korisnickoIme"
            type="text"
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            placeholder="Unesite korisnicko ime"
            minLength={3}
            maxLength={15}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Lozinka:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Unesite lozinku"
            minLength={3}
            maxLength={15}
            required
          />
        </div>

        {greska && <p style={{ color: "red" }}>{greska}</p>}

        <button type="submit">
          {jeRegistracija ? "Registracija" : "Prijava"}
        </button>
      </form>
      <button
        onClick={() => setJeRegistracija(!jeRegistracija)}
        style={{ marginTop: "1rem" }}
      >
        {jeRegistracija
          ? "Imate nalog? Prijavite se"
          : "Nemate nalog? Registrujte se"}
      </button>
    </div>
  );
}
