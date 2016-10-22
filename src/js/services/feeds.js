// @flow
import ApiClient from "../utils/api-client";
import type { FeedId, Feed } from "../types/feed";

const apiClient = new ApiClient("/feeds");


export function fetchFeeds(): Promise<Array<Feed>> {
  return apiClient.get("/");
}

export function addFeed(url: string): Promise<{ feed: Feed }> {
  return apiClient.post("/", { body: { url } });
}

export function deleteFeed(id: FeedId): Promise<{ feed: Feed }> {
  return apiClient.delete("/", { body: { id } });
}
