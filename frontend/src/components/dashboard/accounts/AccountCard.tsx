import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Account } from "@/types/accounts.types";
import { IndianRupee } from "lucide-react";
import numeral from "numeral";

export const AccountCard = ({ account }: { account: Account }) => {
  return (
    <Card key={account.id}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{account.account}</CardTitle>
        <p className="text-xs text-muted-foreground">{account.group}</p>
      </CardHeader>
      <CardContent>
        <p className="flex items-center text-2xl font-bold truncate">
          <IndianRupee />
          {numeral(account.balance).format("0,0.00")}
        </p>
      </CardContent>
    </Card>
  );
};
