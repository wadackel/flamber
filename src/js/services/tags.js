// @flow
import ApiClient from "../utils/api-client";
import type { TagId, Tag, Tags, UpdateTagRequestPayload } from "../types/tag";

const apiClient = new ApiClient("/tags");


export function fetchTags(): Promise<{ tags: Tags }> {
  return apiClient.get("/");
}

export function addTag(name: string): Promise<{ tag: Tag }> {
  return apiClient.post("/", { body: { name } });
}

export function updateTag(payload: UpdateTagRequestPayload): Promise<{ tag: Tag }> {
  return apiClient.put("/", { body: payload });
}

export function deleteTag(id: TagId): Promise<{ tag: Tag }> {
  return apiClient.delete("/", { body: { id } });
}
