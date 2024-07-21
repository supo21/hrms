"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

async function logout() {
  const res = await fetch("http://localhost:3000/api/auth/logout/", {
    method: "POST",
  });
  return res.ok;
}

export default function ProfileDropdown() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <UserRound className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            if (await logout())
              router.push("http://localhost:3000/admin/login/?next=/");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
