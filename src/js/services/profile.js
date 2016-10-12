// @flow
import ApiClient from "../utils/api-client";
import type { UserId, User } from "../types/user";

const apiClient = new ApiClient("/profile");


export function updateProfile(id: UserId, photo: ?File, name: string): Promise<{ user: User }> {
  return apiClient.put("/", {
    body: { id, photo, name }
  });
}
