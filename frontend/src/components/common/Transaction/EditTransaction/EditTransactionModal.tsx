"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { toast } from "@/components/ui/use-toast";
import { getAllAccounts } from "@/lib/query/accounts";
import { editTransaction } from "@/lib/query/transactions";
import { EditTransacton, Transaction } from "@/types/transaction.types";
import TransactionForm from "../TransactionForm";
import { Account } from "@/types/accounts.types";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  transaction: Transaction;
};

const EditTransactionModal = ({ open, setOpen, transaction }: Props) => {
  const router = useRouter();
  const [accountsList, setAccountsList] = useState<Account[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<EditTransacton>({
    defaultValues: {
      id: transaction.id,
      accountId: transaction.accountId,
      accountName: transaction.accountName,
      type: transaction.type,
      amount: transaction.amount,
      tag: transaction.tag,
      note: transaction.note,
      createdAt: transaction.createdAt,
    },
  });

  const { isDirty } = form.formState;

  const handleEditTransaction: SubmitHandler<EditTransacton> = async (data) => {
    setLoading(true);
    try {
      const payload: EditTransacton = {
        ...data,
        accountId:
          accountsList?.find((account) => account.account === data.accountName)
            ?.id ?? "",
        amount: +data.amount,
      };

      const response = await editTransaction<EditTransacton>(payload);

      if (response.status === 200) {
        toast({
          title: "Transaction edited",
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

  useEffect(() => {
    const fetchUserAccounts = async () => {
      const userAccounts = await getAllAccounts();
      setAccountsList(userAccounts);
    };
    fetchUserAccounts();
  }, []);

  return (
    <TransactionForm
      open={open}
      setOpen={setOpen}
      form={form}
      handleSubmit={handleEditTransaction}
      loading={loading}
      disabled={!isDirty}
      errorMessage={errorMessage}
      accountsList={accountsList}
      formName="Edit Transaction"
    />
  );
};

export default EditTransactionModal;
