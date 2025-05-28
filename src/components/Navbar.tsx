// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import tagHubLogo from "../assets/tagHubLogo.png";

export default function Navbar() {
  return (
    <nav className="w-full text-text-50 py-4 px-8 flex justify-between items-center z-50  text-base">
      <div className="flex gap-6">
        <Link to="/" className="flex items-center">
          <img src={tagHubLogo} alt="TagHub logo" className="h-8 w-auto" />
        </Link>{" "}
        <Link to="/task1" className="hover:text-accent-300 transition">
          Task 1
        </Link>
        <Link to="/items-explorer" className="hover:text-accent-300 transition">
          Task 2
        </Link>
      </div>
      <Link to="/" className="text-lg font-semibold text-accent-200 hover:text-accent-100 transition">
        Tara Olivia Bjørheim
      </Link>
    </nav>
  );
}
