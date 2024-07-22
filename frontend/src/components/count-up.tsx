"use client";

import { getDuration } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function CountUp({ date }: { date: Date }) {
  const [now, setNow] = useState(new Date());
  const duration = getDuration(date, now);
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div suppressHydrationWarning>{duration}</div>;
}
