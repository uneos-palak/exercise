/* eslint @typescript-eslint/no-namespace: 0 */
/* eslint @typescript-eslint/no-empty-function: 0 */

import { useFlag } from "@unleash/proxy-client-vue";
import { UnleashClient } from "@unleash/proxy-client-vue";

const unleash_config = {
  url: import.meta.env.VITE_UNLEASH_FRONTEND_BASE_URL + "/api/frontend",
  clientKey: import.meta.env.VITE_UNLEASH_FRONTEND_TOKEN,
  refreshInterval: 60,
  appName: "default",
};

export const unleash_client = new UnleashClient(unleash_config);
export function isEnabled(qualified_name: string) {
  const enabled = useFlag(qualified_name);
  return enabled;
}
