import ApiClient from "../utils/api-client";

const apiClient = new ApiClient("/application");


export function createApp() {
  return apiClient.post("/");
}


export function deleteApp() {
  return apiClient.delete("/");
}
