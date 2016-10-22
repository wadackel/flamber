// @flow
import ApiClient from "../utils/api-client";
import type { TagId, Tag, Tags } from "../types/tag";

const apiClient = new ApiClient("/tags");


// TODO: Type definition
export function fetchTags(): Promise<{ tags: Tags }> {
  return apiClient.get("/");
}

export function addTag(name: string): Promise<{ tag: Tag }> {
  return apiClient.post("/", { body: { name } });
}

export function updateTag(newProps: any) {
  return apiClient.put("/", { body: newProps });
}

export function deleteTag(id: TagId) {
  return apiClient.delete("/", { body: { id } });
}
