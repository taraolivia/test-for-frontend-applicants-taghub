import { useEffect, useState } from "react";
import { useSelectedProjectStore } from "../stores/useSelectedProjectStore";
import { useSelectedItemStore } from "../stores/useSelectedItemStore";
import { fetchEvents } from "../api/taghub";

export interface Event {
  epc: string;
  service?: { id: number; name: string };
  project?: string;
  eventType?: number;
  projectId?: number;
  user: string;
  userObject?: {
    email: string;
    first_name: string;
    last_name: string;
    picture?: string | null;
    id?: number;
  };
  id: number;
  userTimestamp: string;
  message: string;
  value?: Record<string, string | number | boolean | null> | string | number | boolean | null;
  tag?: string;
  tag2?: string;
  stringData?: string;
  urlData?: string;
  integerData?: number;
  timezoneAwareTime?: string;
}

export default function ItemEvents() {
  const { projectId } = useSelectedProjectStore();
  const { epcString } = useSelectedItemStore();
  const [events, setEvents] = useState<Event[]>([]);

  const [filters, setFilters] = useState({
    showUser: true,
    showTimestamp: true,
    showMessage: false,
    showEmail: false,
    showTimezone: false,
    showStringData: false,
    showIntegerData: false,
    showUrlData: false,
    showTags: false,
    showProject: false,
    showEventType: false,
    showEventId: false,
    showEPC: false,
  });

  useEffect(() => {
    if (!projectId || !epcString) return;

    fetchEvents(projectId, epcString, import.meta.env.VITE_TAGHUB_CONSUMER_KEY!)
      .then(setEvents)
      .catch(console.error);
  }, [projectId, epcString]);

  if (!epcString) return null;
  if (events.length === 0) return <p className="p-4">No events found.</p>;

  return (
    <div className="p-4 bg-white border mt-4 rounded shadow">
                    <h2 className="font-bold text-lg mb-4">Events for {epcString}</h2>


      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        {Object.entries(filters).map(([key, value]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value}
              onChange={() =>
                setFilters((f) => ({ ...f, [key]: !f[key as keyof typeof filters] }))
              }
            />
            {key.replace(/^show/, "").replace(/([A-Z])/g, " $1").trim()}
          </label>
        ))}
      </div>
<div className="flex gap-2 mb-2">
<button
          className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded"
          onClick={() => {
            const allTrue = Object.keys(filters).reduce((acc, key) => {
              acc[key as keyof typeof filters] = true;
              return acc;
            }, {} as typeof filters);
            setFilters(allTrue);
          }}
        >
          Toggle All
        </button>
        <button
          className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          onClick={() => {
            const allFalse = Object.keys(filters).reduce((acc, key) => {
              acc[key as keyof typeof filters] = false;
              return acc;
            }, {} as typeof filters);
            setFilters(allFalse);
          }}
        >
          Clear All
        </button>
      </div>
      <ul className="space-y-6 text-left">
        {events.map((e, i) => (
          <li key={i} className="border-b pb-4">
            <div className="text-base font-semibold mb-1 text-purple-800">🔧 {e.service?.name || "Unknown service"}</div>

            {e.value !== undefined && (
              <div className="bg-gray-50 rounded px-3 py-2 mb-2">
                {typeof e.value === "object" && e.value !== null ? (
                  <ul className="pl-4 list-disc text-sm text-gray-800">
                    {Object.entries(e.value).map(([k, v]) => (
                      <li key={k}>
                        {k.charAt(0).toUpperCase() + k.slice(1)}: {String(v)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-800">
                    {typeof e.value === "string" && !isNaN(Date.parse(e.value))
                      ? new Date(e.value.replace(" ", "T")).toLocaleString()
                      : String(e.value)}
                  </p>
                )}
              </div>
            )}

            {filters.showUser && <div>👤 User: {e.user}</div>}
            {filters.showTimestamp && (
              <div>📅 Timestamp: {new Date(e.userTimestamp.replace(" ", "T")).toLocaleString()}</div>
            )}
            {filters.showMessage && <div>📝 Message: {e.message}</div>}
            {filters.showEmail && e.userObject && (
              <div>
                📧 Email: {e.userObject.email} <br />
                🙍‍♀️ Name: {e.userObject.first_name} {e.userObject.last_name}
              </div>
            )}
            {filters.showTimezone && (
              <div>🕓 Timezone-aware: {e.timezoneAwareTime && !isNaN(Date.parse(e.timezoneAwareTime))
                ? new Date(e.timezoneAwareTime.replace(" ", "T")).toLocaleString()
                : e.timezoneAwareTime || "N/A"}</div>
            )}
            {filters.showStringData && <div>🔤 String Data: {e.stringData}</div>}
            {filters.showIntegerData && e.integerData !== null && (
              <div>🔢 Integer Data: {e.integerData}</div>
            )}
            {filters.showUrlData && e.urlData && (
              <div>
                🔗 URL: <a href={e.urlData}>{e.urlData}</a>
              </div>
            )}
            {filters.showTags && (
              <>
                {e.tag && <div>🏷️ Tag 1: {e.tag}</div>}
                {e.tag2 && <div>🏷️ Tag 2: {e.tag2}</div>}
              </>
            )}
            {filters.showProject && (
              <div>📦 Project: {e.project} (ID: {e.projectId})</div>
            )}
            {filters.showEventType && <div>📊 Event Type: {e.eventType}</div>}
            {filters.showEventId && <div>🆔 Internal Event ID: {e.id}</div>}
            {filters.showEPC && <div>🆔 EPC: {e.epc}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
