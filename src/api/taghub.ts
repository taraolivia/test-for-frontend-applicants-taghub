const API_BASE = "https://demo.taghub.net/api";

let accessKey: string | null = null;

export async function login(username: string, password: string, consumerKey: string) {
  const res = await fetch(`${API_BASE}/user/accesskey/plain`, {
    method: "POST",
    headers: {
      TAGHUB_CONSUMER_KEY: consumerKey, 
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: new URLSearchParams({ username, password }),
  });

  const raw = await res.text(); 

  if (!res.ok) throw new Error("Login failed");

  const result = JSON.parse(raw);
  accessKey = result.session_key;
  return accessKey;
}

function getHeaders(consumerKey: string) {
  if (!accessKey) throw new Error("Not authenticated");
  return {
    TAGHUB_CONSUMER_KEY: consumerKey,
    TAGHUB_ACCESS_KEY: accessKey,
  };
}

export async function fetchItems(projectId: string, consumerKey: string) {
  const res = await fetch(`${API_BASE}/projects/${projectId}/items`, {
    headers: getHeaders(consumerKey),
  });

  if (!res.ok) throw new Error("Failed to fetch items");

  const result = await res.json();
  return result.data;
}

export async function fetchProjects(consumerKey: string) {
  const res = await fetch(`${API_BASE}/projects`, {
    headers: getHeaders(consumerKey),
  });

  if (!res.ok) throw new Error("Failed to fetch projects");

  const result = await res.json();
  return result.data;
}

export async function fetchEvents(projectId: string, epcString: string, consumerKey: string) {
  const res = await fetch(`${API_BASE}/projects/${projectId}/items/${epcString}/events`, {
    headers: getHeaders(consumerKey),
  });

  if (!res.ok) throw new Error("Failed to fetch events");

  const result = await res.json();
  return result.data;
}
