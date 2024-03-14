"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { BankGroupEnum } from "@/constants/enum/account.enum";
import { addAccount } from "@/lib/query/accounts";
import { Account } from "@/types/accounts.types";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import AddedAccountList from "./AddedAccountList";
import { useState } from "react";

type SetupForm = {
  account: string;
  balance: string | number;
  group: BankGroupEnum;
};

const intitialValues: SetupForm = {
  account: "",
  balance: "",
  group: BankGroupEnum.BankAccount,
};

export default function SetupContainer({
  accounts,
}: {
  accounts: Account[] | undefined;
}) {
  const router = useRouter();
  const form = useForm<SetupForm>({ defaultValues: intitialValues });
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddAccount: SubmitHandler<SetupForm> = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      balance: +data.balance,
    };
    try {
      const response = await addAccount<SetupForm>(payload);
      if (response?.status === 201) {
        toast({
          title: `Account ${data.account} saved`,
          action: <CheckCircle2 className="text-green-400" />,
        });
        router.refresh();
        form.reset(intitialValues);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <h1 className="text-xl font-medium">Accounts</h1>

        {accounts?.length && <AddedAccountList accounts={accounts} />}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddAccount)}>
            <div className="grid grid-cols-5 gap-3">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl onChange={field.onChange}>
                      <Input
                        {...field}
                        required
                        placeholder="Account Name"
                        min={1}
                        max={25}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(BankGroupEnum).map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl onChange={field.onChange}>
                      <Input
                        {...field}
                        required
                        placeholder="Balance"
                        type="number"
                        step="0.01"
                        min={0}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="col-span-5 justify-self-end flex items-center gap-4">
                {accounts?.length === 3 && (
                  <p className="text-xs text-red-600">
                    Max 3 accounts can be added in Free version
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={accounts?.length === 3 || loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Account
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className="grid gap-2">
        <h1 className="text-xl font-medium">Currencies</h1>
        <div className="flex items-center gap-2">
          <Select disabled>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="INR, Indian Ruppee ₹" />
            </SelectTrigger>
          </Select>
          <p className="text-xs text-red-600">*Feature coming soon</p>
        </div>
      </div>
    </div>
  );
}
