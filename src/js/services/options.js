// @flow
import ApiClient from "../utils/api-client";
import type { Options } from "../types/options";

const apiClient = new ApiClient("/options");


export function fetchOptions(): Promise<{ options: Options }> {
  return apiClient.get("/");
}

export function updateOption<T>(key: string, value: T): Promise<{ [key: string]: T }> {
  return apiClient.put(`/${key}`, { body: { [key]: value } });
}
