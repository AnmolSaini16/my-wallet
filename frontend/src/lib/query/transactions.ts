import { ApiNamesEnum } from "@/constants/enum/api.enum";
import {
  deleteData,
  getDataWithQueryString,
  postData,
  putData,
} from "../actions";
import { objectToQueryString } from "../utils";
import { Transaction } from "@/types/transaction.types";

export const getTransactions = async ({
  skip,
  take,
  year,
}: {
  skip?: number;
  take?: number;
  year?: string;
}): Promise<Transaction[] | undefined> => {
  const queryString = objectToQueryString({ skip, take, year });
  try {
    const transactionsData = await getDataWithQueryString<Transaction[]>(
      ApiNamesEnum.GetTransactions,
      queryString
    );
    if (transactionsData.length) return transactionsData;
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = async <T>(payload: T): Promise<Response> => {
  return postData(ApiNamesEnum.Transaction, payload);
};

export const editTransaction = async <T>(payload: T): Promise<Response> => {
  return putData(ApiNamesEnum.Transaction, payload);
};

export const deleteTransaction = async ({
  payload,
}: {
  payload: { transactionId: string };
}): Promise<Response> => {
  return deleteData(ApiNamesEnum.Transaction, payload);
};
