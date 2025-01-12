import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { getSession } from "next-auth/react";
// import { UserType } from "@/types/intefaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict; Secure`;
};

export const getActualPath = (path: string) => {
  // const session: any = await getSession(); // Assuming this function is defined elsewhere
  // const user: UserType = session?.user;
  // const schoolCode =
  //   user?.schoolShortName && user?.schoolShortName != "None"
  //     ? user?.schoolShortName
  //     : user?.schoolCode || globalThis.localStorage.getItem("SCHOOL_CODE");

  const schoolCode = globalThis.localStorage?.getItem("SCHOOL_CODE");
  console.log("getactual session", schoolCode);
  return `/schools/${schoolCode}/${path}/` as string;
};

export const getApiUrl = (path: string) => {
  const schoolCode = globalThis.localStorage?.getItem("SCHOOL_CODE");
  console.log("getactual session", schoolCode);
  return `/${schoolCode}/api/v1${path}` as string;
};
