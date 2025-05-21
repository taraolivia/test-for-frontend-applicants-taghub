// src/App.tsx
import "./App.css"
import { Link } from "react-router-dom";


export default function App() {
  return (
    <div className="h-full">
      <h1 className="text-3xl text-amber-500">Test for Frontend applicants</h1>
      <h2>Tara Olivia Bjørheim</h2>
      <h3>Link to repository</h3>
      <p>The purpose of this app is to submit my answers to test 1 and 2:</p>
      <p>
        <a href="https://gitlab.taghub.net/documentation/devdocs/-/wikis/Test-for-Frontend-applicants">
          gitlab.taghub.net/.../Test-for-Frontend-applicants
        </a>
      </p>
      <p>Built with Vite, React, TypeScript, Tailwind; deployed on Netlify.</p>

      <div className="flex items-stretch justify-between h-full w-full">
        <div className="bg-amber-50">
<Link to="/task1" className="underline text-blue-600">Open Laggy Chat</Link>
        </div>
        <div className="bg-purple-50">
  2. <Link to="/items-explorer" className="underline text-blue-600">Items Explorer</Link>
        </div>
      </div>

    </div>
  )
}
