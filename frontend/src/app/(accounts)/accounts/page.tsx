import MainShell from "@/components/common/shells/MainShell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllAccounts } from "@/lib/query/accounts";
import { Account } from "@/types/accounts.types";
import { IndianRupee, Pencil, Plus, Trash } from "lucide-react";
import numeral from "numeral";

export default async function BankAccountsPage() {
  const accountsPromise = await getAllAccounts();
  return (
    <MainShell title="Accounts" subtitle="Modify your accounts">
      <div className="flex flex-col justify-center gap-4 items-center sm:flex-row">
        {accountsPromise?.map((account) => (
          <AccountCard account={account} />
        ))}

        <Button size="icon" disabled>
          <Plus />
        </Button>
      </div>
    </MainShell>
  );
}

const AccountCard = ({ account }: { account: Account }) => {
  return (
    <Card className="min-w-[300px] h-[200px]">
      <CardHeader>
        <CardTitle>{account.account}</CardTitle>
        <CardDescription>{account.group}</CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <p className="text-sm font-extralight"> Current Balance:</p>

        <p className="flex items-center font-semibold text-lg">
          <IndianRupee size={16} />
          {numeral(account.balance).format("0,0.00")}
        </p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Button variant="outline">
          <Pencil size={16} />
        </Button>
        <Button variant="outline">
          <Trash size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};
