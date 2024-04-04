"use client";

import { CheckCircle2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AddAccountForm } from "@/app/(setup)/welcome/_components/SetupContainer";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BankGroupEnum } from "@/constants/enum/account.enum";
import { addAccount } from "@/lib/query/accounts";
import { Account } from "@/types/accounts.types";
import AccountFromWrapper from "./AccountFromWrapper";

type Props = { disabled: boolean };

const intitialValues: AddAccountForm = {
  account: "",
  balance: "",
  group: BankGroupEnum.BankAccount,
};

const AddAccountModal = ({ disabled }: Props) => {
  const [showAddModel, setShowAddModel] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<AddAccountForm>({
    defaultValues: {
      ...intitialValues,
    },
  });

  const handleAddAccount: SubmitHandler<AddAccountForm> = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      balance: +data.balance,
    };
    try {
      const response = await addAccount<Partial<Account>>(payload);
      if (response?.status === 201) {
        toast({
          title: `Account ${data.account} added`,
          action: <CheckCircle2 className="text-green-400" />,
        });
        router.refresh();
        setShowAddModel(false);
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
    <>
      <Button
        size="icon"
        disabled={disabled}
        onClick={() => setShowAddModel(true)}
      >
        <Plus />
      </Button>
      {showAddModel && (
        <AccountFromWrapper
          setOpen={setShowAddModel}
          formName="Add Account"
          form={form}
          loading={loading}
          disabled={loading}
          handleSubmit={handleAddAccount}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default AddAccountModal;
