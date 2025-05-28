// src/App.tsx
import "./App.css";
import { Link } from "react-router-dom";
import tagHubLogo from "./assets/tagHubLogo.png";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen p-8 w-full bg-gradient-to-b from-[#00091a] via-[#002466]  to-[#9d4afd] text-text-100 ">
      <Navbar />
      <div className="max-w-3xl m-auto space-y-10 py-30">
        <header className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-text-50">Test for Frontend applicants</h1>
          <img src={tagHubLogo} alt="TagHub Logo" className="mx-auto w-10 h-auto rounded" />
          <h2 className="text-lg text-accent-200">Tara Olivia Bjørheim</h2>
        </header>

        <section className="bg-background-800 p-6 rounded-xl shadow space-y-5 border border-background-700">
          <h3 className="text-lg font-semibold text-primary-50">About this app</h3>
          <p>This app is built to demonstrate my solutions for test 1 and 2.</p>
          <p className="text-base">
            Test description:{" "}
            <a href="https://gitlab.taghub.net/documentation/devdocs/-/wikis/Test-for-Frontend-applicants" target="_blank" rel="noopener noreferrer" className="text-accent-300 underline hover:text-accent-100">
              gitlab.taghub.net/.../Test-for-Frontend-applicants
            </a>
          </p>
                    <p className="text-base">
            Repository:{" "}
            <a href="https://github.com/taraolivia/test-for-frontend-applicants-taghub" target="_blank" rel="noopener noreferrer" className="text-accent-300 underline hover:text-accent-100">
              https://github.com/taraolivia/test-for-frontend-applicants-taghub
            </a>
          </p>
          <p className="text-base text-text-400">Built with Vite, React, TypeScript and Tailwind. Deployed with Netlify.</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/task1" className="block bg-primary-800 hover:bg-primary-700 transition p-4 rounded-lg text-center text-text-50 font-medium shadow border border-primary-600">
            🗨️ Laggy Chat (Task 1)
          </Link>
          <Link to="/items-explorer" className="block bg-secondary-800 hover:bg-secondary-700 transition p-4 rounded-lg text-center text-text-50 font-medium shadow border border-secondary-600">
            📦 Items Explorer (Task 2)
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}
