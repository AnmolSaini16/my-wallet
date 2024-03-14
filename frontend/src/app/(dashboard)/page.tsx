import { Suspense } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import AccountsCards from "@/components/dashboard/accounts";
import Overview from "@/components/dashboard/overview";
import LatestTransactions from "@/components/dashboard/latestTransactions";
import { getAllAccounts } from "@/lib/query/accounts";
import { getTransactions } from "@/lib/query/transactions";
import MainShell from "@/components/common/shells/MainShell";
import { Button } from "@/components/ui/button";
import AddTransactionButton from "@/components/common/Transaction/AddTransaction/AddTransactionButton";

export default async function Home({
  searchParams,
}: {
  searchParams: { year: string };
}) {
  const accountsPromise = getAllAccounts();
  const transactionsMutate = getTransactions({
    skip: 0,
    take: 5,
  });

  const transactionsChartMutate = getTransactions({
    year: searchParams.year ?? new Date().getFullYear().toString(),
  });

  const [accounts, allTransaction, transactionsChartData] = await Promise.all([
    accountsPromise,
    transactionsMutate,
    transactionsChartMutate,
  ]);

  return (
    <MainShell title="Dashboard" primaryAction={<AddTransactionButton />}>
      <AccountsCards accounts={accounts} />

      <div className="mt-4 grid gap-4 md:grid-cols-1 lg:grid-cols-7 h-[calc(100vh-290px)]">
        <div className="md:col-span-1 lg:col-span-4">
          <Overview transactions={transactionsChartData} />
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <LatestTransactions transactions={allTransaction} />
        </div>
      </div>
    </MainShell>
  );
}
