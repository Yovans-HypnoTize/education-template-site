export const getBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(baseUrl);

  if (!baseUrl) {
    throw new Error(
      "VITE_API_BASE_URL is not defined in environment variables"
    );
  }

  return baseUrl;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const pathNameExtractor = (value: any) => {
  // console.log("pathNameExtractor", value.slice(1));
  return value.slice(1).split("/");
};

export const getCurrentPathName = (value: any) => {
  const pathName = pathNameExtractor(value);
  const decodedItem = decodeURIComponent(pathName.slice(-1)[0]);
  const transformedPathname =
    decodedItem.charAt(0).toUpperCase() + decodedItem.slice(1).toLowerCase();
  return transformedPathname;
};

import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};

export function capitalizeWords(str :string): string {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
