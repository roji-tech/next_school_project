import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LanndingPageHeader = () => {
  return (
    <div className="w-full h-[90px] px-[5%] bg-[#ffffff] justify-between items-center inline-flex">
      <Image src="/logo.png" alt="logo" width={40} height={40} />

      <div className="max-sm:hidden justify-start items-center gap-2.5 flex">
        <Link
          href={"/login"}
          className="px-10 py-3 rounded border border-[#021f33] justify-center items-center gap-2.5 flex"
        >
          <span className="whitespace-nowrap text-center text-[#021f33] text-xl font-bold">
            Log In
          </span>
        </Link>
        <Link
          href={"/register"}
          className="px-10 py-3 bg-[#086cb4] rounded justify-center items-center gap-2.5 flex"
        >
          <span className="whitespace-nowrap text-center text-[#f0f0f1] text-xl font-bold font-['Eudoxus Sans']">
            SIgn Up
          </span>
        </Link>
      </div>
    </div>
  );
};
