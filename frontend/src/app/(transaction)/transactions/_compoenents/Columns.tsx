"use client";

import { format } from "date-fns";
import numeral from "numeral";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { DataTableColumnHeader } from "@/components/common/table/components/DataTableColumnHeader";
import TransactionOperations from "@/components/common/Transaction/TransactionOperations";
import { Transaction } from "@/types/transaction.types";
import TransactionTagIcon from "@/components/common/TransactionTagIcon";
import { IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnDef } from "@/types/dataTable.types";
import {
  TransactionTagEnum,
  TransactionTypeEnum,
} from "@/constants/enum/transaction.enum";
import { FacetedFilterName } from "@/constants/enum/dataTable.enum";

export const TransactionTableColumnsDef: DataTableColumnDef<Transaction> = {
  config: {
    [FacetedFilterName.ShowTypeFecetedFilter]: {
      label: "type",
      title: "Type",
      options: Object.values(TransactionTypeEnum).map((type) => ({
        label: type,
        value: type,
      })),
    },
    [FacetedFilterName.ShowTagsFecetedFilter]: {
      label: "tag",
      title: "Tags",
      options: Object.values(TransactionTagEnum).map((tag) => ({
        label: tag,
        value: tag,
      })),
    },
  },
  columns: [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        return (
          <span className="truncate font-medium">
            {format(row.getValue("createdAt"), "dd-MM-yyyy")}
          </span>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) => {
        return <span>{row.getValue("type")}</span>;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-0">
            <IndianRupee size={16} />
            <span>{numeral(row.getValue("amount")).format("0,0.00")}</span>
          </div>
        );
      },

      enableSorting: true,
    },
    {
      accessorKey: "tag",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tag" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <TransactionTagIcon
              className="text-sm h-4 w-4 text-muted-foreground"
              tag={row.original.tag}
            />
            <span>
              <Badge variant="outline">{row.getValue("tag")}</Badge>
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
    },
    {
      accessorKey: "accountName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Account Name" />
      ),
      cell: ({ row }) => {
        return <span>{row.getValue("accountName")}</span>;
      },

      enableSorting: true,
    },
    {
      accessorKey: "note",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Note" />
      ),
      cell: ({ row }) => {
        return (
          <div className="max-w-[200px] truncate font-medium">
            {row.getValue("note")}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <TransactionOperations
          transaction={row.original}
          triggerBtn={
            <div className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-muted">
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </div>
          }
        />
      ),
    },
  ],
};
