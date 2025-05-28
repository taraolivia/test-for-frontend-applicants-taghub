import { useEffect, useState } from "react";
import { login, fetchProjects } from "../api/taghub";
import { useSelectedProjectStore } from "../stores/useSelectedProjectStore";

const username = import.meta.env.VITE_TAGHUB_USERNAME!;
const password = import.meta.env.VITE_TAGHUB_PASSWORD!;
const consumerKey = import.meta.env.VITE_TAGHUB_CONSUMER_KEY!;

interface Project {
  uuid: string;
  name: string;
}

export default function ProjectSelector() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<string>("");
  const setProjectId = useSelectedProjectStore((state) => state.setProjectId);

  useEffect(() => {
    async function load() {
      try {


        const accessKey = await login(username, password, consumerKey);
        console.log("\u2705 Logged in successfully. Access key:", accessKey);

        const data = await fetchProjects(consumerKey);
        console.log("\ud83d\udce6 Loaded projects:", data);

        setProjects(data);
        const firstId = data[0]?.uuid || "";
        setSelected(firstId);
        setProjectId(firstId);
      } catch (err) {
        console.error("\u274c Failed to load projects:", err);
      }
    }

    load();
  }, [setProjectId]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const uuid = e.target.value;
    setSelected(uuid);
    setProjectId(uuid);
    console.log("Selected project:", uuid);
  }

  if (projects.length === 0) return <p className="p-4 text-sm">Loading projects…</p>;

  return (
    <div className="p-4">
      <label className="block font-medium mb-2 text-text-50">Project:</label>
      <select value={selected} onChange={handleChange} className="p-2 rounded bg-background-800 border border-background-600 text-text-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
        {projects.map((p) => (
          <option key={p.uuid} value={p.uuid} className="text-background-900">
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
