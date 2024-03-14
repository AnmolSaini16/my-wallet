import { getSession } from "next-auth/react";
import { ApiNamesEnum } from "@/constants/enum/api.enum";
import { getServerAuthSession } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";

const getURLPath = (apiName: ApiNamesEnum) => {
  switch (apiName) {
    case ApiNamesEnum.User:
      return "/api/user";

    case ApiNamesEnum.Accounts:
      return "/api/account";

    case ApiNamesEnum.Transaction:
      return "/api/transaction";

    case ApiNamesEnum.GetTransactions:
      return "/api/transaction/getTransactions";

    default:
      return "";
  }
};

const getToken = async () => {
  if (typeof window === "undefined") {
    const serverSession = await getServerAuthSession();
    return serverSession?.token ?? null;
  }

  const token = localStorage.getItem("token");

  if (token !== "undefined" && token !== null) {
    return token;
  }

  const session = await getSession();
  localStorage.setItem("token", session?.token as string);
  return session?.token ?? null;
};

export const getData = async <T>(apiName: ApiNamesEnum): Promise<T> => {
  const token = await getToken();

  const response = await fetch(`${baseURL}${getURLPath(apiName)}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.json();
};

export const getDataWithQueryString = async <T>(
  apiName: ApiNamesEnum,
  queryString: string
): Promise<T> => {
  const token = await getToken();

  const response = await fetch(
    `${baseURL}${getURLPath(apiName)}?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.json();
};

export const postData = async <T>(
  apiName: ApiNamesEnum,
  payload: T
): Promise<Response> => {
  const token = await getToken();

  const response = await fetch(`${baseURL}${getURLPath(apiName)}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const patchData = async <T>(
  apiName: ApiNamesEnum,
  payload: T
): Promise<Response> => {
  const token = await getToken();

  const response = await fetch(`${baseURL}${getURLPath(apiName)}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const putData = async <T>(
  apiName: ApiNamesEnum,
  payload: T
): Promise<Response> => {
  const token = await getToken();

  const response = await fetch(`${baseURL}${getURLPath(apiName)}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const deleteData = async <T>(
  apiName: ApiNamesEnum,
  payload: T
): Promise<Response> => {
  const token = await getToken();

  const response = await fetch(`${baseURL}${getURLPath(apiName)}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};
