import AddTransactionButton from "@/components/common/Transaction/AddTransaction/AddTransactionButton";
import MainShell from "@/components/common/shells/MainShell";
import { getTransactions } from "@/lib/query/transactions";
import TransactionTable from "./_compoenents/TransactionTable";

export default async function TransactionsPage() {
  const transactions = await getTransactions({});

  return (
    <MainShell title="Transactions" primaryAction={<AddTransactionButton />}>
      <div className="px-4 ">
        <TransactionTable transactions={transactions} />
      </div>
    </MainShell>
  );
}
