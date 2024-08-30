"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";

import { getCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { DatePickerWithRange } from "./date-range-picker";
import { DateRange } from "react-day-picker";

export function SubmitAbsence() {
  const router = useRouter();
  const [date, setDate] = useState<DateRange | undefined>();
  const [reason, setReason] = useState<string>("");

  const submitAbsence = async () => {
    if (!date && !reason) {
      toast({
        title: "Please fill all the fields.",
      });
      return;
    }

    if (!date?.from) {
      toast({
        title: "Please select a valid date.",
      });
      return;
    }

    // set date.to as date.from when
    // only date.from is selected
    // aka single date
    const to = date.to || date.from;

    try {
      const csrftoken = getCookie("csrftoken");
      if (!csrftoken) return null;
      const res = await fetch(`/api/absence-balances/submit/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          start: format(date.from, "yyyy-MM-dd"),
          end: format(to, "yyyy-MM-dd"),
          description: reason,
        }),
      });
      if (res.ok) {
        toast({
          title: (await res.json()).detail,
        });
        router.refresh();
      } else if (res.status === 401) {
        router.push("/login/");
      } else if (res.status === 400) {
        toast({
          title: (await res.json()).detail,
        });
      } else {
        toast({
          title: "Unexpected error occured.",
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          Submit Absence
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Absence</DialogTitle>
          <DialogDescription>Provide a descripton and date.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-2">
            <Label
              htmlFor="description"
              className="text-left max-w-[70px] w-full"
            >
              Reason
            </Label>
            <Input
              id="description"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="date" className="text-left max-w-[70px] w-full">
              Date
            </Label>
            <DatePickerWithRange date={date} onChange={(d) => setDate(d)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitAbsence}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
