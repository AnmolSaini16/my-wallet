"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Account } from "@/types/accounts.types";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  account: Account;
};

const DeleteAccountModal = ({ setOpen, account }: Props) => {
  return (
    <Dialog open onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account {account.account}</DialogTitle>
          <DialogDescription className="text-red-600 py-2">
            Note: All your transaction linked with the account will be deleted
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Delete Account</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
