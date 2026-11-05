import apiClient from "@/lib/apiClient";
import type { userRegisterSchema } from "@/validation";
import z from "zod";

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export type UserRegisterPayload = z.infer<
  typeof userRegisterSchema
>;
export function userRegister(payload: UserRegisterPayload) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/auth/me");
}
