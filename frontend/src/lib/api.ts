import { cookies } from "next/headers";
import { components } from "./schema";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) return null;
  const res = await fetch("http://localhost:3000/api/users/current/", {
    headers: {
      Cookie: `sessionid=${sessionid.value}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getCurrentTimeLog() {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) return null;
  const res = await fetch("http://localhost:3000/api/time-logs/current/", {
    headers: {
      Cookie: `sessionid=${sessionid.value}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getTimeLogs(): Promise<
  components["schemas"]["PagedTimeLogDTO"] | null
> {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) return null;
  const res = await fetch("http://localhost:3000/api/time-logs/?limit=10", {
    headers: {
      Cookie: `sessionid=${sessionid.value}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}
