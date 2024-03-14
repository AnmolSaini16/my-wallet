"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { SetStateAction, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { CreateTransaction } from "@/types/transaction.types";
import { TransactionTypeEnum } from "@/constants/enum/transaction.enum";
import { Account } from "@/types/accounts.types";
import { getAllAccounts } from "@/lib/query/accounts";
import { toast } from "@/components/ui/use-toast";
import { createTransaction } from "@/lib/query/transactions";
import TransactionForm from "../TransactionForm";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const AddTransactionModal = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [accountsList, setAccountsList] = useState<Account[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<CreateTransaction>({
    defaultValues: {
      type: TransactionTypeEnum.Expense,
      amount: 0,
      createdAt: new Date().toISOString(),
      note: "",
    },
  });

  const handleAddTransaction: SubmitHandler<CreateTransaction> = async (
    data
  ) => {
    setLoading(true);
    try {
      const payload: CreateTransaction = {
        ...data,
        accountId:
          accountsList?.find((account) => account.account === data.accountName)
            ?.id ?? "",
        amount: +data.amount,
      };

      const response = await createTransaction<CreateTransaction>(payload);

      if (response.status === 201) {
        toast({
          title: "Transaction added",
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
      handleSubmit={handleAddTransaction}
      loading={loading}
      errorMessage={errorMessage}
      accountsList={accountsList}
      formName="Add Transaction"
    />
  );
};

export default AddTransactionModal;
