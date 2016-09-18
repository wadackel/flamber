import ApiClient from "../utils/api-client";

const apiClient = new ApiClient("/tags");


export function fetchTags() {
  return apiClient.get("/");
}

export function addTag(name) {
  return apiClient.post("/", { body: { name } });
}

export function updateTag(newProps) {
  return apiClient.put("/", { body: newProps });
}

export function deleteTag(id) {
  return apiClient.delete("/", { body: { id } });
}
