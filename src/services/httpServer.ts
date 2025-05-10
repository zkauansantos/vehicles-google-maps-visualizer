import axios from "axios";

import { serverEnv } from "@/config/serverEnv";

export const httpServer = axios.create({
  baseURL: serverEnv.apiUrl,
  headers: {
    Authorization: `Bearer ${serverEnv.authorizationApiKey}`,
  },
});
