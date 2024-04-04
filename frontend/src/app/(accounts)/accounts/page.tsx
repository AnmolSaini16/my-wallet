import AccountCard from "@/components/common/account/AccountCard";
import AddAccountModal from "@/components/common/account/AddAccountModal";
import MainShell from "@/components/common/shells/MainShell";
import { getAllAccounts } from "@/lib/query/accounts";

export default async function BankAccountsPage() {
  const accounts = await getAllAccounts();

  const addAccountDisabled = accounts?.length === 2;
  return (
    <MainShell title="Accounts" subtitle="Modify your accounts">
      <div className="flex flex-col justify-center gap-4 items-center sm:flex-row">
        {accounts?.map((account) => (
          <AccountCard account={account} key={account.id} />
        ))}

        <AddAccountModal disabled={addAccountDisabled} />
      </div>
      {addAccountDisabled && (
        <p className="text-xs text-red-600 text-center mt-4">
          Max 2 accounts can be added in Free version
        </p>
      )}
    </MainShell>
  );
}
