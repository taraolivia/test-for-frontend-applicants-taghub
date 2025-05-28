import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function Footer() {
  const { isAuthenticated, email, logout } = useAuthStore();

  return (
    <footer className="w-full text-text-50 py-4 px-8 border-t border-background-700 text-base">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          {isAuthenticated ? (
            <span className="text-text-50">Logged in as: <span className="text-accent-200">{email}</span></span>
          ) : (
            <span className="text-text-50">Not logged in</span>
          )}
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-accent-100 hover:text-accent-100 transition"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-accent-100 hover:text-accent-100 transition"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
