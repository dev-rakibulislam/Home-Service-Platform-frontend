import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;if (!BASE_URL) {
  throw new Error("base url not found");
}

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

export default apiClient;
