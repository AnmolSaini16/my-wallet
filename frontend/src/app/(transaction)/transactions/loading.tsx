import AddTransactionButton from "@/components/common/Transaction/AddTransaction/AddTransactionButton";
import MainShell from "@/components/common/shells/MainShell";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <MainShell title="Transactions" primaryAction={<AddTransactionButton />}>
      <div className="border rounded-md grid grid-cols-1 divide-y-2 space-y-1">
        <div className="p-2">
          <Skeleton className="w-3/12 h-8" />
        </div>
        <div className="p-2">
          <Skeleton className="w-full h-6" />
        </div>
        <div className="p-2">
          <Skeleton className="w-full h-6" />
        </div>
        <div className="p-2">
          <Skeleton className="w-full h-6" />
        </div>
        <div className="p-2">
          <Skeleton className="w-full h-6" />
        </div>
        <div className="p-2">
          <Skeleton className="w-full h-6" />
        </div>
        <div className="p-2">
          <Skeleton className="w-full h-6" />
        </div>
      </div>
    </MainShell>
  );
}
