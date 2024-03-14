import Filters from "./filters/Filters";
import { Transaction } from "@/types/transaction.types";
import BarChat from "./chart/BarChat";
import CardWrapper from "@/components/common/shells/CardWrapper";

type Props = {
  transactions: Transaction[] | undefined;
};

export default async function Overview({ transactions }: Props) {
  return (
    <CardWrapper
      title="Overview"
      actionConent={<Filters />}
      className="h-[calc(100vh-360px)] ml-2"
    >
      <BarChat transactions={transactions} />
    </CardWrapper>
  );
}
