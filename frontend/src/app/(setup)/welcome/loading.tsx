import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-[calc(100vh-100px)] p-2">
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle>
            Wallet Setup
            <Separator className="my-4" />
          </CardTitle>

          <CardDescription>
            Create accounts that you would like to keep track of. It could be
            cash in your wallet, bank accounts, credit cards or even a loan to
            your friend.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            <div className="grid gap-3">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-8 w-1/5 justify-self-end" />
            </div>

            <div className="grid gap-2">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {" "}
          <Skeleton className="h-8 w-1/5" />
        </CardFooter>
      </Card>
    </div>
  );
}
