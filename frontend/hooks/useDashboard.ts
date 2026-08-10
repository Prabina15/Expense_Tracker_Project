"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "@/services/dashboardService";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: async () => {
      const response = await getDashboardOverview();
      return response.data;
    },
  });
}