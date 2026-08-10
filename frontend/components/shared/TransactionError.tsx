import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface TransactionsErrorProps {
  noun: string;
  onRetry: () => void;
}

export function TransactionsError({ noun, onRetry }: TransactionsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 space-y-3">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-1">
        <AlertTriangle className="size-6" />
      </div>
      <CardTitle className="text-lg font-semibold text-foreground">
        Couldn&apos;t load {noun}
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-md">
        Something went wrong while fetching your {noun}. Check your
        connection and try again.
      </CardDescription>
      <Button onClick={onRetry} variant="outline" className="mt-2">
        Retry
      </Button>
    </div>
  );
}