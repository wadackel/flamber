// @flow
import ApiClient from "../utils/api-client";

const apiClient = new ApiClient("/settings");


export function fetchSettings() {
  return apiClient.get("/");
}

export function updateSettings<T>(key: string, value: T): Promise<{ [key: string]: T }> {
  return apiClient.put(`/${key}`, { body: { [key]: value } });
}
