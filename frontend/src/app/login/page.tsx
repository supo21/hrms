"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_HOST } from "@/lib/constants";
import { getCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentails below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                placeholder="johndoe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={async () => {
                await fetch(`${API_HOST}/api/csrf/`, {
                  method: "POST",
                  credentials: "include",
                });
                const csrftoken = getCookie("csrftoken");
                if (!csrftoken) return false;
                const res = await fetch(`${API_HOST}/api/auth/login/`, {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "X-CSRFToken": csrftoken,
                  },
                  body: JSON.stringify({
                    username,
                    password,
                  }),
                });
                if (res.ok) {
                  router.push("/");
                } else {
                  const data = await res.json();
                  console.log(data);
                }
              }}
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
