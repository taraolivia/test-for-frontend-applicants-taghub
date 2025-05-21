import ProjectSelector from "./components/ProjectSelector";
import ItemList from "./components/ItemList";
import ItemEvents from "./components/ItemEvents";

export default function ItemsExplorer() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Items Explorer</h1>
      <ProjectSelector />
      <div className="flex gap-6 mt-6">
        <div className="w-1/3">
          <ItemList />
        </div>
        <div className="w-2/3">
          <ItemEvents />
        </div>
      </div>
    </div>
  );
}
