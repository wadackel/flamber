import ApiClient from "../utils/api-client";

const apiClient = new ApiClient("/settings");


export function fetchSettings() {
  return apiClient.get("/");
}


export function updateSettings(settings) {
  return apiClient.put("/", { body: settings });
}
