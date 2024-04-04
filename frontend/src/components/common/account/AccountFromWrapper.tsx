"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import React, { SetStateAction } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BankGroupEnum } from "@/constants/enum/account.enum";

type Props = {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  form: UseFormReturn<any>;
  handleSubmit: SubmitHandler<any>;
  loading: boolean;
  errorMessage: string;
  formName: "Add Account" | "Edit Account";
  disabled: boolean;
};
const AccountFromWrapper = ({
  setOpen,
  form,
  handleSubmit,
  loading,
  errorMessage,
  formName,
  disabled,
}: Props) => {
  return (
    <Dialog open onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{formName}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-2 gap-3 py-4">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormControl onChange={field.onChange}>
                      <Input
                        {...field}
                        required
                        placeholder="Account Name"
                        min={1}
                        max={25}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(BankGroupEnum).map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl onChange={field.onChange}>
                      <Input
                        {...field}
                        required
                        placeholder="Balance"
                        type="number"
                        step="0.01"
                        min={1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {errorMessage.length > 0 && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
              </Alert>
            )}

            <DialogFooter>
              <Button type="submit" id="add-transaction" disabled={disabled}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {formName}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountFromWrapper;
