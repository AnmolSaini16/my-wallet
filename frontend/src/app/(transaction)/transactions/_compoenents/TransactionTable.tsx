"use client";

import CustomTable from "@/components/common/table";
import { Transaction } from "@/types/transaction.types";
import { TransactionTableColumnsDef } from "./Columns";
import { DataTableColumnDef } from "@/types/dataTable.types";

type Props = { transactions: Transaction[] | undefined };

const TransactionTable = ({ transactions }: Props) => {
  const columnDef: DataTableColumnDef<Transaction> = TransactionTableColumnsDef;

  return (
    <CustomTable
      data={transactions ?? []}
      columns={columnDef.columns}
      config={columnDef.config}
    />
  );
};

export default TransactionTable;
