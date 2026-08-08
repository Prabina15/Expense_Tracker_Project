"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/Sidebar";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open mobile menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 border-r border-border">
        <SheetHeader className="sr-only">
          <SheetTitle>Cashflow Navigation</SheetTitle>
          <SheetDescription>
            Access all Cashflow personal finance dashboard sections and settings.
          </SheetDescription>
        </SheetHeader>
        <Sidebar onNavigate={() => setOpen(false)} className="border-none" />
      </SheetContent>
    </Sheet>
  );
}
