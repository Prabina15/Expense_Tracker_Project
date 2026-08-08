import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  PieChart,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  groupLabel: string;
  items: NavItem[];
}

export const navigationConfig: NavGroup[] = [
  {
    groupLabel: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Income",
        href: "/income",
        icon: TrendingUp,
      },
      {
        title: "Expenses",
        href: "/expenses",
        icon: TrendingDown,
      },
      {
        title: "Transactions",
        href: "/transactions",
        icon: ArrowLeftRight,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: PieChart,
      },
    ],
  },
  {
    groupLabel: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];
