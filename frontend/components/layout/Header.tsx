"use client";

import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Left Section: Mobile Nav Trigger & Search Field */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-md">
        <MobileNav />

        {/* Global Search Input on medium/large screens */}
        <div className="relative hidden md:flex items-center w-full max-w-sm">
          <Search className="absolute left-2.5 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search transactions, categories..."
            className="pl-9 h-9 bg-muted/30 hover:bg-muted/50 focus-visible:bg-background transition-colors text-sm rounded-lg"
          />
        </div>
      </div>

      {/* Right Section: Theme Toggle, Notifications, User Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Button Placeholder */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-primary" />
        </Button>

        <div className="h-4 w-px bg-border/60 mx-1 hidden sm:block" />

        {/* User Profile Avatar Placeholder */}
        <div className="flex items-center gap-2.5 pl-1">
          <Avatar size="sm" className="ring-2 ring-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
              PK
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold leading-none text-foreground">
              Prabina K.
            </span>
            <span className="text-[11px] text-muted-foreground leading-none mt-1">
              Pro Account
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
