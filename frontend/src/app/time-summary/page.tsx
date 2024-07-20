import MainLayout from "@/components/main-layout";
import PageUnderConstruction from "@/components/page-under-construction";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Time Summary - Sandbox HRMS",
  description: "Human Resource Management System",
};

export default function TimeLogs() {
  return (
    <MainLayout active="time-summary">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Time Summary</h1>
      </div>
      <PageUnderConstruction />
    </MainLayout>
  );
}
