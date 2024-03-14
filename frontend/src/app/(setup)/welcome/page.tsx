import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SetupContainer from "./_components/SetupContainer";
import { getAllAccounts } from "@/lib/query/accounts";
import { Account } from "@/types/accounts.types";
import FooterBtn from "./_components/FooterBtn";

export default async function WelcomePage() {
  const accounts = await getAllAccounts();

  return (
    <div className="flex justify-center items-center w-full h-full py-4 px-2">
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
          <SetupContainer accounts={accounts} />
        </CardContent>
        <CardFooter className="flex justify-end">
          <FooterBtn disabled={!accounts?.length} />
        </CardFooter>
      </Card>
    </div>
  );
}
