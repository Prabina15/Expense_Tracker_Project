import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your account preferences and application settings.
          </p>
        </div>
        <Badge
          variant="outline"
          className="w-fit gap-1.5 px-3 py-1 text-xs font-medium border-border text-muted-foreground bg-muted/40"
        >
          <Settings className="size-3.5" />
          System Preferences
        </Badge>
      </div>

      {/* Main Content Placeholder Container */}
      <Card className="w-full border-dashed border-2 border-border/80 bg-muted/20">
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-3 max-w-xl mx-auto w-full">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-1">
            <Settings className="size-6" />
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            User & System Preferences
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Account settings, default currency selection, notification thresholds, and security preferences will be configured here.
          </CardDescription>
        </div>
      </Card>
    </div>
  );
}
