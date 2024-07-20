import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PageUnderConstruction() {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Page under construction
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start by adding time logs.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/time-logs/">Go to Time Logs</Link>
        </Button>
      </div>
    </div>
  );
}
