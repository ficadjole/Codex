import { useContext } from "react";
import AuthContext from "../../contexts/auth_context/AuthContext";

export default function Navbar({ onLoginClick }: { onLoginClick?: () => void }) {
  const auth = useContext(AuthContext);

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between">
      <div>Dekaton</div>
      <div>
        {auth?.isAuthenticated ? (
          <span>{auth.user?.username}</span>
        ) : (
          <button onClick={onLoginClick}>Login</button>
        )}
      </div>
    </nav>
  );
}
