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
import { getCookie } from "@/lib/utils";
import { components } from "@/lib/schema";

async function logout() {
  const csrftoken = getCookie("csrftoken");
  if (!csrftoken) return false;
  const res = await fetch("/api/auth/logout/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });
  return res.ok;
}

export default function ProfileDropdown({
  currentUser,
}: {
  currentUser: components["schemas"]["UserDTO"];
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="">
          <UserRound className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{currentUser.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            if (await logout()) router.push("/login/");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
