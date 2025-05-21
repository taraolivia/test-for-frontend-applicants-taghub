export interface Project {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  epcString: string;
  fields: Record<string, unknown>;
}

export interface Metadata {
  services: {
    name: string;
    type: string;
  }[];
}

export interface Event {
  serviceName: string;
  value: unknown;
  user: string;
  timestamp: string;
}
