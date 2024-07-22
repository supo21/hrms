"use client";
import { format } from "date-fns";

// this component must be client component, because it uses browser timezone
export default function TimeLogEnd({
  end,
}: {
  end: string | null | undefined;
}) {
  if (end) return format(end, "hh:mm aa");
  return "-";
}
