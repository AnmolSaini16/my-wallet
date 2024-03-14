import Link from "next/link";

import { Transaction } from "@/types/transaction.types";
import { Button } from "../../ui/button";
import { TransactionRow } from "./TransactionsRow";
import CardWrapper from "@/components/common/shells/CardWrapper";
import { ChevronRight } from "lucide-react";

type Props = {
  transactions: Transaction[] | undefined;
};

export default async function LatestTransactions({ transactions }: Props) {
  return (
    <CardWrapper
      title="Latest Transactions"
      actionConent={<ActioncContent />}
      className="h-[calc(100vh-400px)] overflow-auto space-y-6"
    >
      {!transactions?.length ? (
        <p className="text-center text-muted-foreground">No Data</p>
      ) : (
        <>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </>
      )}
    </CardWrapper>
  );
}

const ActioncContent = () => (
  <Button variant="ghost" className="w-fit" asChild>
    <Link href="/transactions">
      View All <ChevronRight className="h-4 w-4" />
    </Link>
  </Button>
);
