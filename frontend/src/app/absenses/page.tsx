import MainLayout from "@/components/main-layout";
import PageUnderConstruction from "@/components/page-under-construction";
import { getCurrentUser } from "@/lib/apiServer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Absenses - Sandbox HRMS",
  description: "Human Resource Management System",
};

export default async function TimeLogs() {
  const currentUser = await getCurrentUser();
  return (
    <MainLayout currentUser={currentUser} active="absenses">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Absenses</h1>
      </div>
      <PageUnderConstruction />
    </MainLayout>
  );
}
