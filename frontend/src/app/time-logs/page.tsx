import MainLayout from "@/components/main-layout";
import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTimeLogs } from "@/lib/api";
import { getDuration } from "@/lib/utils";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Time Logs - Sandbox HRMS",
  description: "Human Resource Management System",
};

export default async function TimeLogs() {
  const timeLogs = await getTimeLogs();
  return (
    <MainLayout active="time-logs">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Time Logs</h1>
      </div>
      <Table>
        <TableCaption>
          Showing {timeLogs?.items.length} out of {timeLogs?.count}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Activity</TableHead>
          </TableRow>
        </TableHeader>
        {timeLogs ? (
          <TableBody>
            {timeLogs.items.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.id}</TableCell>
                <TableCell>{format(i.begin, "yyyy/MM/dd hh:mm aa")}</TableCell>
                <TableCell>
                  {i.end ? format(i.end, "yyyy/MM/dd hh:mm aa") : "-"}
                </TableCell>
                <TableCell>
                  {getDuration(
                    new Date(i.begin),
                    i.end ? new Date(i.end) : new Date()
                  )}
                </TableCell>
                <TableCell>{i.project__name}</TableCell>
                <TableCell>{i.activity__name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </MainLayout>
  );
}
