import { useEffect, useState } from "react";
import { fetchItems } from "../api/taghub";
import { useSelectedProjectStore } from "../stores/useSelectedProjectStore";
import { useSelectedItemStore } from "../stores/useSelectedItemStore";

interface Item {
  epcString: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface ItemListProps {
  className?: string;
  view?: "grid" | "list";
}

export default function ItemList({ className = "", view = "grid" }: ItemListProps) {
  const projectId = useSelectedProjectStore((state) => state.projectId);
  const epcString = useSelectedItemStore((state) => state.epcString);
  const setEpcString = useSelectedItemStore((state) => state.setEpcString);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    const consumerKey = import.meta.env.VITE_TAGHUB_CONSUMER_KEY!;
    setLoading(true);

    fetchItems(projectId, consumerKey)
      .then((data: Item[]) => {
        setItems(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId, setEpcString]);

  if (!projectId) return null;
  if (loading) return <p className="text-sm text-gray-600">Loading items...</p>;
  if (items.length === 0) return <p className="text-sm text-gray-600">No items found for this project.</p>;

  const isValidType = (value: unknown): value is string | number | boolean => {
    return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
  };

  const formatKey = (key: string) => {
    return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="mt-6 w-full">
      <div className={view === "grid" ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}` : `flex flex-col gap-4 ${className}`}>
        {items.map((item) => (
          <div key={item.epcString} onClick={() => setEpcString(item.epcString)} className={`p-4 border rounded cursor-pointer shadow transition text-xs ${epcString === item.epcString ? "bg-purple-200" : "bg-white hover:bg-purple-100"}`}>
            <h3 className="font-bold text-sm mb-1 truncate">{item.epcString}</h3>
            <ul className="space-y-1 text-gray-700">
              {Object.entries(item).map(([key, value]) => {
                if (key === "epcString") return null;
                if (!isValidType(value)) return null;
                if (typeof value === "string" && !isNaN(Date.parse(value))) {
                  value = new Date(value.replace(" ", "T")).toLocaleString();
                }
                return (
                  <li key={key} className="truncate">
                    <span className="font-medium">{formatKey(key)}:</span> {String(value)}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
