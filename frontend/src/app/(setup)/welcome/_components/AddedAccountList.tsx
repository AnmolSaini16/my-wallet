import { Input } from "@/components/ui/input";
import { Account } from "@/types/accounts.types";

import React from "react";

type Props = { accounts: Account[] };

const AddedAccountList = ({ accounts }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {accounts.map((account) => (
        <React.Fragment key={account.id}>
          <Input disabled className="col-span-3" value={account.account} />
          <Input disabled className="col-span-2" value={account.group} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default AddedAccountList;
