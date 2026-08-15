"use client";

import { useQuery } from "@tanstack/react-query";
import { getAnalyticsOverview } from "@/services/analyticsService";

export function useAnalyticsOverview(months: number) {
  return useQuery({
    queryKey: ["analytics", "overview", months],
    queryFn: async () => {
      const response = await getAnalyticsOverview(months);
      return response.data;
    },
  });
}