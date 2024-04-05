"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Trash } from "lucide-react";

import { Account } from "@/types/accounts.types";
import { deleteAccount } from "@/lib/query/accounts";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  account: Account;
};

const DeleteAccountModal = ({ setOpen, account }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <AlertDialog open onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account {account.account}</AlertDialogTitle>
          <AlertDialogDescription className="text-red-600 py-2">
            Note: All your transaction linked with the account will be deleted.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {errorMessage.length > 0 && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
          </Alert>
        )}

        <AlertDialogFooter>
          <AlertDialogAction
            disabled={loading}
            className="bg-red-600 focus:ring-red-600"
            onClick={async (event) => {
              event.preventDefault();
              setLoading(true);

              const deleted = await deleteAccount({
                id: account.id,
              });

              if (deleted.status === 200) {
                setOpen(false);
                router.refresh();
              } else if (deleted.status === 400) {
                const data = await deleted.json();
                setErrorMessage(data?.message);
              }
              setLoading(false);
            }}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="mr-2 h-4 w-4" />
            )}
            Delete Account
          </AlertDialogAction>
          <AlertDialogCancel> Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountModal;
