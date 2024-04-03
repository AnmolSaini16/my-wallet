import AddTransactionButton from "@/components/common/Transaction/AddTransaction/AddTransactionButton";
import CardWrapper from "@/components/common/shells/CardWrapper";
import MainShell from "@/components/common/shells/MainShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <MainShell title="Dashboard" primaryAction={<AddTransactionButton />}>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {new Array(3).fill("").map((_i, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                <Skeleton className="h-4 w-[80px]" />
              </CardTitle>
              <Skeleton className="h-5 w-[50px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[180px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-1 lg:grid-cols-7 h-[calc(100vh-290px)]">
        <div className="md:col-span-1 lg:col-span-4">
          <CardWrapper
            title="Overview"
            actionConent={<Skeleton className="h-8 w-16" />}
          >
            <div className="h-[calc(100vh-400px)] ">
              <Loader2 className="h-10 w-10 animate-spin m-auto" />
            </div>
          </CardWrapper>
        </div>
        <div className="md:col-span-1 lg:col-span-3">
          <CardWrapper
            title="Latest Transactions"
            actionConent={<Skeleton className="h-8 w-16" />}
            className="max-h-[450px]"
          >
            <div className="overflow-auto space-y-6 h-full">
              {new Array(5).fill("").map((_i, index) => (
                <div className="flex items-center" key={index}>
                  <div>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                  <div className="ml-2 space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <div className="ml-auto space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>
      </div>
    </MainShell>
  );
}
