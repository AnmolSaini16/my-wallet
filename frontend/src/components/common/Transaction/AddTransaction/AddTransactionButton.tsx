"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import AddTransactionModal from "./AddTransactionModal";

type Props = {};

const AddTransactionButton = ({}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
      {open && <AddTransactionModal open={open} setOpen={setOpen} />}
    </>
  );
};

export default AddTransactionButton;
