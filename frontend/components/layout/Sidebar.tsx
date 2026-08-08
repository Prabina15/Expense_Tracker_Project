"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import { navigationConfig } from "@/lib/nav-config";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-card border-r border-border/60 text-card-foreground",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-border/60 px-6">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Wallet className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold tracking-tight text-base text-foreground leading-tight">
            Cashflow
          </span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
            PERSONAL FINANCE
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationConfig.map((group) => (
          <div key={group.groupLabel} className="space-y-1">
            <h2 className="px-3 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-2">
              {group.groupLabel}
            </h2>
            <nav className="grid gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all outline-none",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-transform group-hover:scale-105",
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-accent-foreground"
                      )}
                    />
                    <span className="truncate">{item.title}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full",
                          isActive
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer / Status indicator */}
      <div className="border-t border-border/60 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/40 p-3 text-xs">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">Cashflow Active</span>
            <span className="text-[11px] text-muted-foreground">
              Personal Finance Shell
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
