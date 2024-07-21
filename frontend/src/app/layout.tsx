import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Sandbox HRMS",
  description: "Human Resource Management System",
};

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
