import { useEffect, useState } from "react";
import { useSelectedProjectStore } from "../stores/useSelectedProjectStore";
import { useSelectedItemStore } from "../stores/useSelectedItemStore";
import { fetchEvents } from "../api/taghub";
import { useNavigate } from "react-router-dom";

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

const formatDate = (val?: string) => (val && !isNaN(Date.parse(val.replace(" ", "T"))) ? new Date(val.replace(" ", "T")).toLocaleString() : "N/A");

export default function ItemEvents() {
  const projectId = useSelectedProjectStore((state) => state.projectId);
  const epcString = useSelectedItemStore((state) => state.epcString);
  const [events, setEvents] = useState<Event[]>([]);
  const setEpcString = useSelectedItemStore((state) => state.setEpcString);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    showUser: true,
    showTimestamp: true,
    showMessage: true,
    showEmail: true,
    showTimezone: true,
    showStringData: true,
    showIntegerData: true,
    showUrlData: true,
    showTags: true,
    showProject: true,
    showEventType: true,
    showEventId: true,
    showEPC: true,
  });

  useEffect(() => {
    if (!projectId || !epcString) return;
    fetchEvents(projectId, epcString, import.meta.env.VITE_TAGHUB_CONSUMER_KEY!)
      .then(setEvents)
      .catch(console.error);
  }, [projectId, epcString]);

  if (!epcString) return null;
  if (events.length === 0) return <p className="p-4 text-base text-text-50">No events found.</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-[#00091a] to-[#00163f] mt-6 rounded-2xl shadow-md relative text-text-50">
      <div className="mb-6 flex flex-col items-start gap-y-5 justify-between">
        <button
          onClick={() => {
            setEpcString(null);
            navigate("/items-explorer");
          }}
          className="text-base bg-primary-500 hover:bg-primary-400 text-text-50 px-3 py-1 rounded"
        >
          ← Back to projects
        </button>
        <h2 className="text-2xl font-semibold">
          Events for EPC: <span className="font-mono text-accent-300">{epcString}</span>
        </h2>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-base">
          {Object.entries(filters).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input type="checkbox" checked={value} onChange={() => setFilters((f) => ({ ...f, [key]: !f[key as keyof typeof filters] }))} />
              {key
                .replace(/^show/, "")
                .replace(/([A-Z])/g, " $1")
                .trim()}
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 border-t pt-3 text-base">
          <button
            className="px-3 py-1 bg-primary-500 hover:bg-primary-400 rounded"
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
            className="px-3 py-1 bg-secondary-500 hover:bg-secondary-400 rounded"
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((e, i) => (
          <div key={i} className="bg-background-800 border border-background-700 rounded-xl shadow-sm hover:shadow-lg transition p-4 text-base flex flex-col justify-between">
            <div>
              <div className="font-semibold text-accent-300 mb-2">{e.service?.name || "Unknown service"}</div>
              {filters.showTimestamp && <div className="mb-2 text-xs">{formatDate(e.userTimestamp)}</div>}

              {e.value !== undefined && (
                <div className="bg-background-700 rounded px-3 py-2 mb-2">
                  {typeof e.value === "object" && e.value !== null && !Array.isArray(e.value) ? (
                    <ul className="pl-4 list-disc">
                      {"name" in e.value ? (
                        <li>{String(e.value.name)}</li>
                      ) : (
                        Object.entries(e.value as Record<string, string | number | boolean | null>).map(([k, v]) => (
                          <li key={k}>
                            {k.charAt(0).toUpperCase() + k.slice(1)}: {String(v)}
                          </li>
                        ))
                      )}
                    </ul>
                  ) : (
                    <p>{typeof e.value === "string" && !isNaN(Date.parse(e.value)) ? formatDate(e.value) : String(e.value)}</p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1 mt-2">
              {filters.showUser && <div>{e.user}</div>}
              {filters.showMessage && <div>{e.message}</div>}
              {filters.showEmail && e.userObject && (
                <div>
                  {e.userObject.email} <br />
                  {e.userObject.first_name} {e.userObject.last_name}
                </div>
              )}
              {filters.showTimezone && <div>{formatDate(e.timezoneAwareTime)}</div>}
              {filters.showStringData && <div>{e.stringData}</div>}
              {filters.showIntegerData && <div>{e.integerData}</div>}
              {filters.showUrlData && e.urlData && (
                <div>
                  <a href={e.urlData} className="text-accent-300 underline">
                    {e.urlData}
                  </a>
                </div>
              )}
              {filters.showTags && (
                <>
                  {e.tag && <div>{e.tag}</div>}
                  {e.tag2 && <div>{e.tag2}</div>}
                </>
              )}
              {filters.showProject && (
                <div>
                  {e.project} (ID: {e.projectId})
                </div>
              )}
              {filters.showEventType && <div>Type: {e.eventType}</div>}
              {filters.showEventId && <div>ID: {e.id}</div>}
              {filters.showEPC && <div>{e.epc}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
