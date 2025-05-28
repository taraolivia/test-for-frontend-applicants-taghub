import TagHubApi from "@taghub/api";

const client = new TagHubApi.TagHubClient({
  consumerKey: import.meta.env.VITE_TAGHUB_CONSUMER_KEY!,
  username: import.meta.env.VITE_TAGHUB_USERNAME!,
  password: import.meta.env.VITE_TAGHUB_PASSWORD!,
});

export default client;
