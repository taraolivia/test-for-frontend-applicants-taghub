import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [inputKey, setInputKey] = useState("");
  const setAccessKey = useAuthStore((s) => s.setAccessKey);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (inputKey.trim() && email.trim()) {
      setAccessKey(inputKey, email);
      navigate("/items-explorer");
    }
  };

  return (
    <div className="min-h-screen bg-background-900 text-text-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full px-4 py-12">
        <div className="bg-background-800 p-6 rounded-xl shadow max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded border border-background-600 bg-background-700 text-text-50 mb-4"
          />
          <label className="block mb-2 text-sm">Access Key</label>
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            className="w-full p-2 rounded border border-background-600 bg-background-700 text-text-50 mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-2 rounded"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
