// @flow
import ApiClient from "../utils/api-client";

import type { Feed } from "../types/feed";

const apiClient = new ApiClient("/feeds");


export function addFeed(url: string): Promise<Feed> {
  return apiClient.post("/", { body: { url } });
}
