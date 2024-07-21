"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { components } from "@/lib/schema";
import { getCookie, getDuration } from "@/lib/utils";
import { useEffect, useState } from "react";

async function startTimeLog() {
  const csrftoken = getCookie("csrftoken");
  if (!csrftoken) return null;
  const res = await fetch("http://localhost:3000/api/time-logs/start/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      project: 1,
      activity: 1,
    }),
  });
  if (!res.ok) return null;
  return res.json();
}

async function endTimeLog() {
  const csrftoken = getCookie("csrftoken");
  if (!csrftoken) return false;
  const res = await fetch("http://localhost:3000/api/time-logs/end/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });
  return res.ok;
}

export default function TimeLogCard({
  initial,
}: {
  initial: components["schemas"]["TimeLogDTO"];
}) {
  const [currentTimeLog, setCurrentTimeLog] = useState<
    components["schemas"]["TimeLogDTO"] | null
  >(initial);
  const [now, setNow] = useState(new Date());
  const duration = getDuration(
    currentTimeLog ? new Date(currentTimeLog.begin) : now,
    now
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return currentTimeLog ? (
    <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle suppressHydrationWarning>{duration}</CardTitle>
        <CardDescription>
          {currentTimeLog.project__name}
          <br />
          {currentTimeLog.activity__name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button
          onClick={async () => {
            const data = await endTimeLog();
            if (data) setCurrentTimeLog(null);
          }}
          size="sm"
          className="w-full"
        >
          End Session
        </Button>
      </CardContent>
    </Card>
  ) : (
    <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Time Log</CardTitle>
        <CardDescription>Start your time log session.</CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button
          onClick={async () => {
            const data = await startTimeLog();
            if (data) setCurrentTimeLog(data);
          }}
          size="sm"
          className="w-full"
        >
          Start Session
        </Button>
      </CardContent>
    </Card>
  );
}
