import { TransactionTypeEnum } from "@/constants/enum/transaction.enum";
import { Transaction } from "@/types/transaction.types";

interface MonthlyTotal {
  name: string;
  Expenses: number;
  Incomes: number;
}

export const prepareData = (
  transactions: Transaction[] | undefined
): MonthlyTotal[] => {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  const monthlyTotals: {
    [month: string]: { expense: number; income: number };
  } = {};

  // Initialize monthlyTotals with all months and total set to 0
  const allMonths = Array.from({ length: 12 }, (_, index) =>
    new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(2022, index, 1)
    )
  );

  allMonths.forEach((monthName) => {
    monthlyTotals[monthName] = { expense: 0, income: 0 };
  });

  transactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    if (transaction.type === TransactionTypeEnum.Expense) {
      monthlyTotals[monthName].expense += transaction.amount;
    } else if (transaction.type === TransactionTypeEnum.Income) {
      monthlyTotals[monthName].income += transaction.amount;
    }
  });

  const result: MonthlyTotal[] = allMonths.map((monthName) => ({
    name: monthName,
    Expenses: monthlyTotals[monthName].expense,
    Incomes: monthlyTotals[monthName].income,
  }));

  return result;
};
