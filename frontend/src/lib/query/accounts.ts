import { ApiNamesEnum } from "@/constants/enum/api.enum";
import { getData, patchData, postData } from "../actions";
import { Account } from "@/types/accounts.types";

export const getAllAccounts = async (): Promise<Account[] | undefined> => {
  try {
    const accountsData = await getData<Account[]>(ApiNamesEnum.Accounts);
    if (accountsData?.length) return accountsData;
  } catch (error) {
    console.log(error);
  }
};

export const addAccount = async <T>(payload: T): Promise<Response> => {
  return postData(ApiNamesEnum.Accounts, payload);
};

export const editAccount = async <T>(payload: T): Promise<Response> => {
  return patchData(ApiNamesEnum.Accounts, payload);
};
