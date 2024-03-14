import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt, { JwtPayload } from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectToQueryString(params: any) {
  return Object.keys(params)
    .filter(
      (key) =>
        params[key] !== null && params[key] !== undefined && params[key] !== ""
    )
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
}

export const getYearsList = (startYear = 2000) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  while (startYear <= currentYear) {
    years.unshift(startYear.toString());
    startYear++;
  }

  return years;
};

export const getTokenExpiryTime = (token: string) => {
  const decodedToken = jwt.decode(token) as JwtPayload;
  return decodedToken?.exp as number;
};

export const isTokenExpired = (token: string) => {
  const decodedTokenExpTime = getTokenExpiryTime(token);
  if (decodedTokenExpTime) {
    if (Date.now() > decodedTokenExpTime * 1000) return true;
  }
  return false;
};
