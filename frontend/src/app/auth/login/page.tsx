"use client";

import Image from "next/image";
import { useState } from "react";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Login from "./components/Login";
import Register from "./components/Register";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AuthPage() {
  const [authType, setAuthType] = useState<"login" | "register">("login");

  return (
    <div className="container flex h-[100dvh] max-w-lg flex-col justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            <Logo isLink={false} className="text-3xl" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          {authType === "login" ? <Login /> : <Register />}
        </CardContent>

        <CardFooter className="flex items-center justify-center">
          <p className="text-sm font-normal">
            {authType === "login" ? "No Account?" : "Already have an account?"}
          </p>
          <Button
            variant="link"
            onClick={() =>
              setAuthType((prev) => (prev === "login" ? "register" : "login"))
            }
          >
            {authType === "login" ? "Register" : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
