"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AuthGuard } from "@/components/layout/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-background">
        {/* Desktop Fixed Sidebar */}
        <div className="hidden md:fixed md:inset-y-0 md:z-30 md:flex md:w-64 md:flex-col">
          <Sidebar />
        </div>

        {/* Main Content Column (with offset on desktop) */}
        <div className="flex flex-col min-h-screen md:pl-64">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
