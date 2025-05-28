import { useEffect, useState } from "react";
import { fetchItems, fetchEvents } from "../api/taghub";
import { useSelectedProjectStore } from "../stores/useSelectedProjectStore";
import { useNavigate } from "react-router-dom";

interface Item {
  epcString?: string;
  inspected?: boolean;
  [key: string]: string | number | boolean | null | undefined | { name: string } | undefined;
}

interface Event {
  epc: string;
  id: number;
  item?: Item;
  service?: { id: number; name: string };
  project?: string;
  userTimestamp: string;
  value?: string | number | boolean | { name?: string } | null;
}

interface DisplayItem {
  epc: string;
  company: string;
  location: string;
  itemType: string;
  name: string;
  description: string;
  lastUpdated: string;
  age: string;
  distance: string;
  inspected: boolean;
}

const formatDate = (val?: string | null): string => (val && !isNaN(Date.parse(val.replace(" ", "T"))) ? new Date(val.replace(" ", "T")).toLocaleString() : "-");

export default function ItemsExplorerTable() {
  const projectId = useSelectedProjectStore((state) => state.projectId);
  const [rows, setRows] = useState<DisplayItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleFields, setVisibleFields] = useState<(keyof DisplayItem)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectId) return;
    const consumerKey = import.meta.env.VITE_TAGHUB_CONSUMER_KEY!;
    setLoading(true);

    fetchItems(projectId, consumerKey)
      .then(async (itemsData) => {
        const map = new Map<string, Event[]>();

        await Promise.all(
itemsData.map(async (item: Item) => {
            if (!item.epcString) return;
            try {
              const events = await fetchEvents(projectId, item.epcString, consumerKey);
              map.set(item.epcString, events);
            } catch (e) {
              console.error(`Failed to fetch events for ${item.epcString}`, e);
            }
          })
        );

        const getValue = (events: Event[], field: string) => events.filter((e) => e.service?.name === field).sort((a, b) => Date.parse(b.userTimestamp) - Date.parse(a.userTimestamp))[0]?.value;

        const result: DisplayItem[] = [];
        map.forEach((events, epc) => {
          const lastTimestamp = events
            .map((e) => e.userTimestamp)
            .sort()
            .slice(-1)[0];

          const nameVal = getValue(events, "Name");
          const itemTypeVal = getValue(events, "Itemtype");

          result.push({
            epc,
            company: events[0]?.project ?? "–",
            location: typeof getValue(events, "Location") === "string" ? (getValue(events, "Location") as string) : "-",
            itemType: typeof itemTypeVal === "object" && itemTypeVal !== null && "name" in itemTypeVal ? (itemTypeVal as { name?: string }).name ?? "-" : typeof itemTypeVal === "string" ? itemTypeVal : "-",
            name: typeof nameVal === "string" ? nameVal : "-",
            description: typeof getValue(events, "Description") === "string" ? (getValue(events, "Description") as string) : "-",
            lastUpdated: formatDate(lastTimestamp),
            age: getValue(events, "Age")?.toString() ?? "-",
            distance: getValue(events, "Distance")?.toString() ?? "-",
            inspected: getValue(events, "Checked") === true,
          });
        });

        const allFields: (keyof DisplayItem)[] = ["company", "location", "itemType", "name", "description", "lastUpdated", "age", "distance", "inspected", "epc"];

        const fieldsToShow = allFields.filter((field) =>
          result.some((row) => {
            const val = row[field];
            return field === "inspected" ? val === true : val !== "-" && val !== "" && val !== null && val !== undefined;
          })
        );

        setRows(result);
        setVisibleFields(fieldsToShow);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (!projectId) return null;
  if (loading) return <p className="text-base text-text-50">Loading data...</p>;
  if (!loading && rows.length === 0) return <p className="text-base text-text-50">No items found for this project.</p>;

  return (
    <div className="mt-6 w-full overflow-x-scroll">
      <table className="min-w-full border text-sm text-text-50 bg-background-900">
        <thead className="bg-background-800 text-left text-text-50">
          <tr>
            {visibleFields.map((field) => (
              <th key={field} className="border border-background-700 px-3 py-2">
                {field === "epc" ? "EPC" : field.charAt(0).toUpperCase() + field.slice(1)}
              </th>
            ))}
            <th className="border border-background-700 px-3 py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item, i) => (
            <tr key={item.epc} className={`${i % 2 === 0 ? "bg-background-800" : "bg-background-700"} text-text-50`}>
              {visibleFields.map((field) => (
                <td key={field} className="border border-background-600 px-3 py-2">
                  {field === "inspected" ? (item[field] ? "✔" : "✘") : item[field]}
                </td>
              ))}
              <td className="border border-background-600 px-3 py-2">
                <button className="text-text-50 hover:text-accent-100" onClick={() => navigate(`/item/${item.epc}`)}>
                  Open item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
