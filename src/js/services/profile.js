// @flow
import ApiClient from "../utils/api-client";
import type { UserId, User } from "../types/user";

const apiClient = new ApiClient("/profile");


export function updateProfile(id: UserId, photo: ?File, name: string): Promise<{ user: User }> {
  const data = new FormData();
  data.append("id", id);
  data.append("photo", photo);
  data.append("name", name);

  return apiClient.put("/", { body: data });
}
