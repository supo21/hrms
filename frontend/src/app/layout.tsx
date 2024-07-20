import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Sandbox HRMS",
  description: "Human Resource Management System",
};

async function getCurrentUser() {
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  if (!user) redirect("http://localhost:3000/admin/login/?next=/");
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
