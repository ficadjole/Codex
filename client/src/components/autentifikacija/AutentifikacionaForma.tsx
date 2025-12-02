import { useState } from "react";
import { SačuvajVrednostPoKljuču } from "../../helpers/local_storage";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validacijaPodatakaAuthPrijava } from "../../api_services/validators/auth/AuthLoginValidator";
import { validacijaPodatakaAuthRegistracija } from "../../api_services/validators/auth/AuthRegisterValidator";
// react icons
import {RiAccountCircleLine, RiLockPasswordLine} from "react-icons/ri";
import {MdOutlineMail} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function AutentifikacionaForma({
  authApi,
  onLoginSuccess,
}: AuthFormProps) {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [uloga] = useState("kupac");
  const [greska, setGreska] = useState("");
  const [jeRegistracija, setJeRegistracija] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);

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
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-md border border-blue-400 mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {jeRegistracija ? "Registracija" : "Prijava"}
      </h1>

      <form onSubmit={podnesiFormu} className="space-y-4">
        {jeRegistracija && (
          <>  
            <div className="w-full relative">
              <AiOutlineUser
                      className=" absolute top-3.5 left-3 text-[1.5rem] dark:text-slate-400 text-[#777777]"/>
              <input
                type="text"
                placeholder="Ime"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                className="w-full bg-white/40 pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-blue-400 dark:placeholder:text-slate-500"
              />
            </div>

            <div className="w-full relative">
              <AiOutlineUser
                      className=" absolute top-3.5 left-3 text-[1.5rem] dark:text-slate-400 text-[#777777]"/>
              <input
                type="text"
                placeholder="Prezime"
                value={prezime}
                onChange={(e) => setPrezime(e.target.value)}
                className="w-full bg-white/40 pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-full relative">
              <MdOutlineMail
                    className=" absolute top-3.5 left-3 text-[1.5rem] dark:text-slate-400 text-[#777777]"/>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/40 pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}

        <div className="w-full relative">
          <RiAccountCircleLine
                      className=" absolute top-3.5 left-3 text-[1.5rem] dark:text-slate-400 text-[#777777]"/>
          <input
            type="text"
            placeholder="Korisničko ime"
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            className="w-full bg-white/40 pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="w-full relative">
          <RiLockPasswordLine
                      className=" absolute top-3.5 left-3 text-[1.5rem] dark:text-slate-400 text-[#777777]"/>
          <input
            type={isEyeOpen ? "text" : "password"}
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/40 pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                      focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
           {isEyeOpen ? (
                    <IoEyeOutline
                        className=" absolute top-4 right-4 text-[1.5rem] dark:text-slate-400 text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(false)}
                    />
                ) : (
                    <IoEyeOffOutline
                        className=" absolute top-4 right-4 text-[1.5rem] dark:text-slate-400 text-[#777777] cursor-pointer"
                        onClick={() => setIsEyeOpen(true)}
                    />
                )}
        </div>

        {greska && <p className="text-md text-center text-red-700/80 font-medium">{greska}</p>}

        <button
          type="submit"
          className="w-full bg-blue-700/70 hover:bg-blue-700/90 text-white py-2 rounded-xl transition"
        >
          {jeRegistracija ? "Registracija" : "Prijava"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        {jeRegistracija ? "Imate nalog?" : "Nemate nalog?"}{" "}
        <button
          onClick={() => setJeRegistracija(!jeRegistracija)}
          className="text-blue-700 hover:underline"
        >
          {jeRegistracija ? "Prijavite se" : "Registrujte se"}
        </button>
      </p>
    </div>
  );
}
