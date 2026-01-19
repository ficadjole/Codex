import { useState } from "react";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validateAuthLoginData } from "../../api_services/validators/auth/AuthLoginValidator";
import { validateAuthRegistrationData } from "../../api_services/validators/auth/AuthRegisterValidator";

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
      setError(validation.message ?? "Invalid data");
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
        onLoginSuccess(response.data); // JWT TOKEN
      } else {
        setError(response.message);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
   <div>
      <h2 className="text-2xl font-bold mb-4 text-center">{isRegistration ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistration && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {isRegistration ? "Register" : "Login"}
        </button>
      </form>

      <p className="text-center mt-2 text-sm">
        {isRegistration ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegistration(!isRegistration)}
          className="text-blue-600 hover:underline"
        >
          {isRegistration ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}
