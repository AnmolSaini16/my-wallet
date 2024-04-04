"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Account } from "@/types/accounts.types";
import { IndianRupee, Pencil, Trash } from "lucide-react";
import numeral from "numeral";
import { useState } from "react";
import EditAccountModal from "./EditAccountModal";
import DeleteAccountModal from "./DeleteAccountModal";

const AccountCard = ({ account }: { account: Account }) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  return (
    <>
      <Card className="min-w-[300px] h-[200px]">
        <CardHeader>
          <CardTitle>{account.account}</CardTitle>
          <CardDescription>{account.group}</CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <p className="text-sm font-extralight mr-1"> Current Balance: </p>
          <p className="flex items-center font-semibold">
            <IndianRupee size={16} />
            {numeral(account.balance).format("0,0.00")}
          </p>
        </CardContent>
        <CardFooter className="space-x-2">
          <Button variant="outline" onClick={() => setShowEditModal(true)}>
            <Pencil size={16} />
          </Button>
          <Button variant="outline" onClick={() => setShowDeleteModal(true)}>
            <Trash size={16} />
          </Button>
        </CardFooter>
      </Card>
      {showEditModal && (
        <EditAccountModal account={account} setOpen={setShowEditModal} />
      )}
      {showDeleteModal && (
        <DeleteAccountModal setOpen={setShowDeleteModal} account={account} />
      )}
    </>
  );
};

export default AccountCard;
