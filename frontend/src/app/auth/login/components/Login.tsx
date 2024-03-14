"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {};

export interface Login {
  email: string;
  password: string;
}

const Login = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { register, handleSubmit } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data, e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const response = await signIn("login", {
        ...data,
        redirect: false,
      });
      if (!response?.ok) {
        setErrorMessage(response?.error as string);
      } else {
        toast({
          title: "Logged In",
          variant: "default",
          action: <CheckCircle2 className="text-green-400" />,
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            required
            {...register("email")}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            required
            {...register("password")}
          />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>

      {errorMessage.length > 0 && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
        </Alert>
      )}
    </form>
  );
};

export default Login;
