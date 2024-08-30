"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TooltipCell({
  trigger,
  content,
}: {
  trigger: string;
  content: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
