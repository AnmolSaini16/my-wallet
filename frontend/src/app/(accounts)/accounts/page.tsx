import CardWrapper from "@/components/common/shells/CardWrapper";
import MainShell from "@/components/common/shells/MainShell";
import { getAllAccounts } from "@/lib/query/accounts";
import { IndianRupee } from "lucide-react";
import numeral from "numeral";

export default async function BankAccountsPage() {
  const accountsPromise = await getAllAccounts();
  return (
    <MainShell title="Accounts">
      <CardWrapper
        title={"Modify your accounts"}
        actionConent={undefined}
        className="w-[800px] m-auto"
      >
        <div className="space-y-4">
          {accountsPromise?.map((account) => (
            <div className="flex items-center justify-between p-2 border rounded-md">
              <p>{account.account}</p>
              <p className="flex items-center truncate">
                <IndianRupee size={16} />
                {numeral(account.balance).format("0,0.00")}
              </p>
              <p>{account.group}</p>
            </div>
          ))}
        </div>
      </CardWrapper>
    </MainShell>
  );
}
