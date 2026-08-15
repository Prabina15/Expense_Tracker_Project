import api from "@/lib/api";
import type { AnalyticsOverviewResponse } from "@/types/analytics";

export async function getAnalyticsOverview(
  months: number
): Promise<AnalyticsOverviewResponse> {
  const response = await api.get<AnalyticsOverviewResponse>(
    "/analytics/overview",
    { params: { months } }
  );
  return response.data;
}