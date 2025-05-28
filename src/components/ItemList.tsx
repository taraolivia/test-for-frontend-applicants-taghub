import { useEffect, useState } from "react";
import { fetchItems } from "../api/taghub";
import { useSelectedProjectStore } from "../stores/useSelectedProjectStore";
import { Link } from "react-router-dom";

interface Item {
  epcString: string;
  [key: string]: string | number | boolean | null | undefined;
}

const labelMap: Record<string, string> = {
  resultId: "Result ID",
  "-2": "Company",
  "-4": "Timestamp",
  "-1": "EPC Copy",
  id: "Item ID",
};

export default function ItemList() {
  const projectId = useSelectedProjectStore((state) => state.projectId);
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
  }, [projectId]);

  if (!projectId) return null;
  if (loading) return <p className="text-sm text-gray-600">Loading items...</p>;
  if (items.length === 0) return <p className="text-sm text-gray-600">No items found for this project.</p>;

  const isValidType = (value: unknown): value is string | number | boolean => typeof value === "string" || typeof value === "number" || typeof value === "boolean";

  const formatKey = (key: string) => {
    return labelMap[key] || key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^[a-z]/, (c) => c.toUpperCase());
  };

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <table className="min-w-full border text-xs">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">EPC</th>
            <th className="border px-3 py-2 text-left">Type</th>
            <th className="border px-3 py-2 text-left">Date</th>
            <th className="border px-3 py-2 text-left">Details</th>
            <th className="border px-3 py-2 text-left">Events</th>
            <th className="border px-3 py-2 text-left">Link</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const category = typeof item["9"] === "object" && item["9"] !== null && "name" in item["9"] ? (item["9"] as { name: string }).name : null;

            let date = "No date";
            if (typeof item["15"] === "string") {
              const cleanDate = item["15"].replace(" ", "T");
              const parsed = new Date(cleanDate);
              if (!isNaN(parsed.getTime())) {
                date = parsed.toLocaleString();
              }
            } else if (item["-4"] && typeof item["-4"] === "string") {
              const parsed = new Date(item["-4"].replace(" ", "T"));
              if (!isNaN(parsed.getTime())) {
                date = parsed.toLocaleString();
              }
            }

            const details = Object.entries(item)
              .filter(([key, value]) => isValidType(value) && ["-2", "-4", "id"].includes(key))
              .map(([key, value]) => `${formatKey(key)}: ${String(value)}`)
              .join(" | ");

            return (
              <tr key={item.epcString} className="border-b">
                <td className="border px-3 py-2 font-mono whitespace-nowrap">{item.epcString}</td>
                <td className="border px-3 py-2">{category || "Unknown type"}</td>
                <td className="border px-3 py-2 whitespace-nowrap">{date}</td>
                <td className="border px-3 py-2 text-gray-700">{details}</td>
                <td className="border px-3 py-2">
                  <Link to={`/item/${item.epcString}`} className="text-blue-600 hover:underline">
                    Open Item
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
