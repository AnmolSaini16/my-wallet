"use client";

import { Button } from "@/components/ui/button";
import { editUserInfo } from "@/lib/query/common";
import { UserType } from "@/types/user.type";
import { ChevronRight, Loader2 } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = { disabled: boolean };

const FooterBtn = ({ disabled }: Props) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const handleContinue = async () => {
    setLoading(true);

    const newSession = {
      ...session,
      user: {
        ...session?.user,
        lastLogin: new Date(),
      },
    };

    await Promise.all([
      editUserInfo<Partial<UserType>>({ lastLogin: new Date() }),
      update(newSession),
    ]);

    setLoading(false);
    router.refresh(); //refetch session
    router.push("/");
  };

  return (
    <Button disabled={disabled} onClick={handleContinue}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Continue <ChevronRight className="h-4 w-4" />
    </Button>
  );
};

export default FooterBtn;
