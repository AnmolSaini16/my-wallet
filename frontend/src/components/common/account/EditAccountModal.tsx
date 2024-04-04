"use client";

import { CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Account } from "@/types/accounts.types";
import { editAccount } from "@/lib/query/accounts";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import AccountFromWrapper from "./AccountFromWrapper";
import { BankGroupEnum } from "@/constants/enum/account.enum";

type Props = {
  account: Account;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditAccountForm = {
  id: string;
  account: string;
  balance: string | number;
  group: BankGroupEnum;
};

const EditAccountModal = ({ account, setOpen }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<EditAccountForm>({
    defaultValues: {
      id: account.id,
      account: account.account,
      balance: account.balance,
      group: account.group,
    },
  });

  const { isDirty } = form.formState;

  const handleEditAccount: SubmitHandler<EditAccountForm> = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      balance: +data.balance,
    };
    try {
      const response = await editAccount<Partial<Account>>(payload);
      if (response?.status === 200) {
        toast({
          title: `Account ${data.account} edited`,
          action: <CheckCircle2 className="text-green-400" />,
        });
        router.refresh();
        setOpen(false);
      } else if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(data?.message);
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AccountFromWrapper
      setOpen={setOpen}
      formName="Edit Account"
      form={form}
      loading={loading}
      disabled={!isDirty || loading}
      handleSubmit={handleEditAccount}
      errorMessage={errorMessage}
    />
  );
};

export default EditAccountModal;
