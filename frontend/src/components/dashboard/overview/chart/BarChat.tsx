"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import numeral from "numeral";

import { Transaction } from "@/types/transaction.types";
import { prepareData } from "./prepareData";

type Props = {
  transactions: Transaction[] | undefined;
};

const BarChat = ({ transactions }: Props) => {
  const data = useMemo(() => prepareData(transactions), [transactions]);

  return (
    <>
      {!transactions?.length ? (
        <p className="text-center text-muted-foreground">No Data</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${numeral(value).format("0,0.00")}`}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "#09090B",
                borderRadius: 10,
                border: "1px solid #888888",
              }}
              itemStyle={{
                fontSize: 12,
                color: "white",
              }}
              formatter={(value) => `₹${numeral(value).format("0,0.00")}`}
            />
            <Bar
              dataKey="Expenses"
              fill="currentColor"
              className="fill-destructive"
            />
            <Bar dataKey="Incomes" fill="#4ade80b1" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default BarChat;
