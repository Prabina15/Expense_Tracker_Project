import api from "@/lib/api";
import type { DashboardOverviewResponse } from "@/types/dashboard";

export async function getDashboardOverview(): Promise<DashboardOverviewResponse> {
  const response = await api.get<DashboardOverviewResponse>("/dashboard");
  return response.data;
}