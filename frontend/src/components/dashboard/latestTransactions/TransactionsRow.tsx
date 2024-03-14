import TransactionTagIcon from "@/components/common/TransactionTagIcon";
import { TransactionTypeEnum } from "@/constants/enum/transaction.enum";

import { Transaction } from "@/types/transaction.types";
import { format } from "date-fns";
import { IndianRupee, MoreVertical } from "lucide-react";
import numeral from "numeral";
import TransactionOperations from "../../common/Transaction/TransactionOperations";

export const TransactionRow = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  return (
    <>
      <div className="flex items-center gap-2" key={`${transaction.id}`}>
        <div>
          {
            <TransactionOperations
              transaction={transaction}
              triggerBtn={
                <div className="flex h-10 w-4 items-center justify-center rounded-xl transition-colors hover:bg-muted">
                  <MoreVertical className="h-4 w-4" />
                </div>
              }
            />
          }
        </div>
        <div>
          <TransactionTagIcon
            className="border rounded-full p-2"
            tag={transaction.tag}
          />
        </div>
        <div className="ml-2 space-y-1">
          <p className="text-sm font-medium leading-none">{transaction.tag}</p>
          <p className="text-xs text-muted-foreground">
            {transaction.accountName}
          </p>
        </div>
        <div className="ml-auto space-y-1">
          <div className="flex items-center justify-end text-sm font-medium leading-none">
            {transaction.type === TransactionTypeEnum.Expense ? "-" : "+"}
            <IndianRupee size={16} />
            {numeral(transaction.amount).format("0,0.00")}
          </div>

          <div className="text-end text-xs text-muted-foreground">
            {format(transaction.createdAt, "dd MMMM yyyy")}
          </div>
        </div>
      </div>
    </>
  );
};
