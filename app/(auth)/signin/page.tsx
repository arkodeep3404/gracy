"use client";

import Link from "next/link";

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
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function signin() {
    if (email.trim() === "") {
      toast({ description: "please enter your email" });
    } else {
      setLoading(true);
      try {
        const response = await axios.post("/api/signin", {
          email: email.trim(),
        });

        setEmail("");

        toast({ description: response.data.message });
      } catch (error: any) {
        toast({ description: error.response.data.message });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Signin</CardTitle>
          <CardDescription>
            Enter your email below to signin to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full"
              onClick={signin}
            >
              Signin
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}