// @flow
import ApiClient from "../utils/api-client";

import type { Theme } from "../types/prop-types";

const apiClient = new ApiClient("/account");

export function updateTheme(theme: Theme): Promise<{ theme: Theme }> {
  return apiClient.put("/theme", { body: { theme } });
}
