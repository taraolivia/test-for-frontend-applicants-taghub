declare module "@taghub/api" {
  interface Project {
    uuid: string;
    name: string;
  }

  interface Item {
    id: string;
    epcString: string;
    fields: Record<string, unknown>;
  }

  interface Event {
    serviceName: string;
    value: unknown;
    user: string;
    timestamp: string;
  }

  export class TagHubClient {
    constructor(options: { consumerKey: string; username: string; password: string });

    projects: {
      getProjects(): Promise<Project[]>;
      getProjectMetadata(options: { projectId: string }): Promise<unknown>;
    };

    items: {
      getItems(options: { projectId: string }): Promise<Item[]>;
    };

    events: {
      getEvents(options: { projectId: string; epcString: string; serviceId?: string }): Promise<Event[]>;
    };
  }

  const TagHubApi: { TagHubClient: typeof TagHubClient };
  export default TagHubApi;
}
