import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DashboardErrorProps {
  onRetry: () => void;
}

export function DashboardError({ onRetry }: DashboardErrorProps) {
  return (
    <Card className="w-full border-dashed border-2 border-destructive/30 bg-destructive/5">
      <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-3 max-w-xl mx-auto w-full">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-1">
          <AlertTriangle className="size-6" />
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">
          Couldn&apos;t load your dashboard
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-md">
          Something went wrong while fetching your financial overview. Check
          your connection and try again.
        </CardDescription>
        <Button onClick={onRetry} variant="outline" className="mt-2">
          Retry
        </Button>
      </div>
    </Card>
  );
}