import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

import { ProfileForm } from "@/components/settings/ProfileForm";
import { PasswordForm } from "@/components/settings/PasswordForm";
import { AppearanceCard } from "@/components/settings/AppearanceCard";

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

      <div className="grid gap-4 lg:grid-cols-2">
        <ProfileForm />
        <PasswordForm />
      </div>

      <AppearanceCard />
    </div>
  );
}