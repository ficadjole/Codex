import { useState } from "react";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validateAuthLoginData } from "../../api_services/validators/auth/AuthLoginValidator";
import { validateAuthRegistrationData } from "../../api_services/validators/auth/AuthRegisterValidator";
import InputField from "./InputField";
import type { AuthValidationErrors } from "../../types/validation/auth/AuthValidationErrors";
import toast from "react-hot-toast";

export default function AuthForm({ authApi, onLoginSuccess }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<AuthValidationErrors>({})
  const [isRegistration, setIsRegistration] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

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
      setErrors(validation.errors)
      return
    }

    setErrors({})

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
        toast.error(response.message || "Pogrešno korisničko ime ili lozinka.");
      }

    } catch {
      toast.error("Došlo je do greške. Pokušajte ponovo.");
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
              <div className="space-y-1">
                <label className="text-sm">
                  Ime <span className="text-red-500">*</span>
                </label>
                <InputField
                  value={firstName}
                  onChange={setFirstName}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm">
                  Prezime <span className="text-red-500">*</span>
                </label>
                <InputField
                  value={lastName}
                  onChange={setLastName}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <InputField
                  value={email}
                  onChange={setEmail}
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">
                    {errors.email}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-sm">
              Korisničko ime <span className="text-red-500">*</span>
            </label>
            <InputField
              value={username}
              onChange={setUsername}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">
                {errors.username}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm">
              Lozinka <span className="text-red-500">*</span>
            </label>
            <InputField
              value={password}
              onChange={setPassword}
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
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