"use client";

import { format } from "date-fns";
import { CalendarIcon, AlertCircle, Loader2 } from "lucide-react";
import React, { SetStateAction } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  TransactionTypeEnum,
  TransactionTagEnum,
} from "@/constants/enum/transaction.enum";
import { cn } from "@/lib/utils";
import { Account } from "@/types/accounts.types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  form: UseFormReturn<any>;
  handleSubmit: SubmitHandler<any>;
  accountsList: Account[] | undefined;
  loading: boolean;
  errorMessage: string;
  formName: "Add Transaction" | "Edit Transaction";
  disabled?: boolean;
};

const TransactionForm = ({
  open,
  setOpen,
  form,
  handleSubmit,
  accountsList,
  loading,
  errorMessage,
  formName,
  disabled = false,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{formName}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} id="add-transaction">
            <div className="grid grid-cols-3 gap-4 py-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(TransactionTypeEnum).map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    {!accountsList?.length ? (
                      <Skeleton className="h-10 w-full" />
                    ) : (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {accountsList?.map((account) => (
                            <SelectItem
                              key={account.account}
                              value={account.account}
                            >
                              {account.account}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl onChange={field.onChange}>
                      <Input
                        {...field}
                        required
                        type="number"
                        step="0.01"
                        min={1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      required
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-[250px]">
                        {Object.values(TransactionTagEnum)?.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[190px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          //@ts-ignore
                          selected={field.value}
                          onDayClick={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Note"
                      className="resize-none"
                      value={field.value ?? ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {errorMessage.length > 0 && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="text-sm">{errorMessage}</AlertTitle>
              </Alert>
            )}

            <DialogFooter>
              <Button
                type="submit"
                id="add-transaction"
                disabled={loading || disabled}
              >
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

export default TransactionForm;
