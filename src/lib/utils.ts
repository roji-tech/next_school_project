import { UserType } from "@/types/intefaces";
import { clsx, type ClassValue } from "clsx";
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict; Secure`;
};

export const getActualPath = async (path: string) => {
  const session: any = await getSession(); // Assuming this function is defined elsewhere
  const user: UserType = session?.user;
  console.log(session, "getactual session");
  const schoolCode =
    user.schoolShortName ||
    user.schoolCode ||
    globalThis.localStorage.getItem("SCHOOL_CODE");
  return `schools/${schoolCode}/${path}/` as string;
};
