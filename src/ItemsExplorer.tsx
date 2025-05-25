import { useState } from "react";
import ProjectSelector from "./components/ProjectSelector";
import ItemList from "./components/ItemList";
import ItemEvents from "./components/ItemEvents";
import { useSelectedItemStore } from "./stores/useSelectedItemStore";

export default function ItemsExplorer() {
  const epcString = useSelectedItemStore((state) => state.epcString);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen p-8 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Items Explorer</h1>
      <ProjectSelector />

      {/* View toggle shown only when no item is selected */}
      {!epcString && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded border text-sm ${
              view === "grid" ? "bg-purple-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded border text-sm ${
              view === "list" ? "bg-purple-500 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            List
          </button>
        </div>
      )}

      {/* Layout logic */}
      <div className="mt-6">
        {!epcString ? (
          <ItemList view={view} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 min-w-0">
              <ItemList view="list" />
            </div>
            <div className="flex-1 max-w-2/3">
              <ItemEvents />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
