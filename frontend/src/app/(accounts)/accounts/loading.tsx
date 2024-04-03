import MainShell from "@/components/common/shells/MainShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <MainShell title="Accounts" subtitle="Modify your accounts">
      <div className="flex flex-col justify-center gap-4 items-center sm:flex-row">
        {new Array(2).fill("").map((_card, index) => (
          <Card className="w-[300px] h-[200px]" key={index}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-[120px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-[90px]" />
              </CardDescription>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <p className="text-sm font-extralight">
                <Skeleton className="h-4 w-full" />
              </p>
            </CardContent>
            <CardFooter className="space-x-2">
              <Skeleton className="h-10 w-[40px]" />
              <Skeleton className="h-10 w-[40px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainShell>
  );
}
