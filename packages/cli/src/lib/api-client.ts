import { hc } from "hono/client";
import type { AppType } from "@yourcode/server";

export const apiClient = hc<AppType>(
  process.env.API_URL ?? "http://localhost:3000"
);