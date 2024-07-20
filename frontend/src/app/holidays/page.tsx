import MainLayout from "@/components/main-layout";
import PageUnderConstruction from "@/components/page-under-construction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holidays - Sandbox HRMS",
  description: "Human Resource Management System",
};

export default function TimeLogs() {
  return (
    <MainLayout active="holidays">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Holidays</h1>
      </div>
      <PageUnderConstruction />
    </MainLayout>
  );
}
