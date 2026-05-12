import api from "./api";
import type {
  User,
  DashboardResponse,
  CallStats,
  CallHistoryResponse,
} from "@/types";

export async function getProfile() {
  const { data } = await api.get<User>("/api/auth/profile");
  return data;
}

export async function getDashboard() {
  const { data } = await api.get<DashboardResponse>("/api/auth/dashboard");
  return data;
}

export async function getCallStats() {
  const { data } = await api.get<CallStats>("/api/call-sessions/stats");
  return data;
}

export async function getCallHistory(limit = 10) {
  const { data } = await api.get<CallHistoryResponse>("/api/call-sessions", {
    params: { limit },
  });
  return data;
}
