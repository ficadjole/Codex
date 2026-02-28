import { useState } from "react";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validateAuthLoginData } from "../../api_services/validators/auth/AuthLoginValidator";
import { validateAuthRegistrationData } from "../../api_services/validators/auth/AuthRegisterValidator";
import InputField from "./InputField";

export default function AuthForm({ authApi, onLoginSuccess }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = isRegistration
      ? validateAuthRegistrationData(
          firstName,
          lastName,
          email,
          username,
          password,
          "user"
        )
      : validateAuthLoginData(username, password);

    if (!validation.success) {
      setError(validation.message ?? "Neispravni podaci");
      return;
    }

    try {
      const response = isRegistration
        ? await authApi.registration(
            firstName,
            lastName,
            email,
            username,
            password,
            "user"
          )
        : await authApi.login(username, password);

      if (response.success && response.data) {
        onLoginSuccess(response.data);
      } else {
        setError(response.message);
      }
    } catch {
      setError("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4">
      <div
        className="w-full max-w-md
                   bg-[#142326]
                   rounded-2xl shadow-2xl
                   p-8 border border-[#1F3337]"
      >
        <h2 className="text-3xl font-semibold text-center text-[#EAF4EF] mb-6">
          {isRegistration ? "Registracija" : "Prijava"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegistration && (
            <>
              <InputField
                placeholder="Ime"
                value={firstName}
                onChange={setFirstName}
              />
              <InputField
                placeholder="Prezime"
                value={lastName}
                onChange={setLastName}
              />
              <InputField
                placeholder="Email adresa"
                value={email}
                onChange={setEmail}
                type="email"
              />
            </>
          )}

          <InputField
            placeholder="Korisničko ime"
            value={username}
            onChange={setUsername}
          />

          <InputField
            placeholder="Lozinka"
            value={password}
            onChange={setPassword}
            type="password"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#28623A] hover:bg-[#3F8A4B]
                       text-white py-3 rounded-lg
                       transition duration-300 font-medium"
          >
            {isRegistration ? "Registruj se" : "Prijavi se"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[#9DB7AA]">
          {isRegistration
            ? "Već imate nalog?"
            : "Nemate nalog?"}{" "}
          <button
            onClick={() => setIsRegistration(!isRegistration)}
            className="text-[#3F8A4B] hover:underline"
          >
            {isRegistration ? "Prijava" : "Registracija"}
          </button>
        </p>
      </div>
    </div>
  );
}