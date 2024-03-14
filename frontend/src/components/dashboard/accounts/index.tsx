import { AccountCard } from "./AccountCard";
import { Account } from "@/types/accounts.types";

type Props = {
  accounts: Account[] | undefined;
};

export default async function AccountCards({ accounts }: Props) {
  return (
    <>
      {accounts?.length && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {accounts?.map((account) => (
            <AccountCard account={account} key={account.id} />
          ))}
        </div>
      )}
    </>
  );
}
