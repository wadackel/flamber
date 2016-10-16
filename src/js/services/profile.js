// @flow
import ApiClient from "../utils/api-client";
import type { User } from "../types/user";

const apiClient = new ApiClient("/profile");


export function updateProfile(photo: ?File, name: string): Promise<{ user: User }> {
  const data = new FormData();
  data.append("photo", photo);
  data.append("name", name);

  return apiClient.put("/", { body: data });
}
