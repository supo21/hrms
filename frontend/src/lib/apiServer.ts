import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_HOST } from "./constants";
import { components } from "./schema";

export async function getCurrentTimeLog() {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) redirect("/login/");
  try {
    const res = await fetch(`${API_HOST}/api/time-logs/current/`, {
      headers: {
        Cookie: `sessionid=${sessionid.value}`,
      },
    });
    if (res.status === 401) redirect("/login/");
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getProjects() {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) redirect("/login/");
  try {
    const res = await fetch(`${API_HOST}/api/projects/`, {
      method: "GET",
      headers: {
        Cookie: `sessionid=${sessionid.value}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getActivities() {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) redirect("/login/");
  try {
    const res = await fetch(`${API_HOST}/api/activities/`, {
      method: "GET",
      headers: {
        Cookie: `sessionid=${sessionid.value}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) redirect("/login/");
  try {
    const res = await fetch(`${API_HOST}/api/users/current/`, {
      method: "GET",
      headers: {
        Cookie: `sessionid=${sessionid.value}`,
      },
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getHolidays(
  page: number = 1,
  limit: number = 10
): Promise<components["schemas"]["PagedHolidayDTO"] | null> {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) redirect("/login/");
  try {
    const res = await fetch(
      `${API_HOST}/api/holidays/?limit=${limit}&offset=${(page - 1) * limit}`,
      {
        headers: {
          Cookie: `sessionid=${sessionid.value}`,
        },
      }
    );
    if (res.status === 401) redirect("/login/");
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getTimeLogs(
  page: number = 1,
  limit: number = 10
): Promise<components["schemas"]["PagedTimeLogDTO"] | null> {
  const cookieStore = cookies();
  const sessionid = cookieStore.get("sessionid");
  if (!sessionid) redirect("/login/");
  try {
    const res = await fetch(
      `${API_HOST}/api/time-logs/?limit=${limit}&offset=${(page - 1) * limit}`,
      {
        headers: {
          Cookie: `sessionid=${sessionid.value}`,
        },
      }
    );
    if (res.status === 401) redirect("/login/");
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
