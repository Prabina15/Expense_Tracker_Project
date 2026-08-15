import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalyticsSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="shadow-xs border-border/80">
            <CardHeader className="p-6 pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-2">
              <Skeleton className="h-7 w-28" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="shadow-xs border-border/80">
            <CardHeader className="p-6 pb-2">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <Skeleton className="h-72 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="shadow-xs border-border/80">
            <CardHeader className="p-6 pb-2">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <Skeleton className="h-56 w-full rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}