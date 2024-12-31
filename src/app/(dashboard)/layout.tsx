"use client";

import Menu from "@/components/Menu";
import MobileMenu from "@/components/MobileMenu";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "@/types/intefaces";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession() as {
    data: { user: UserType } | null;
    status: string;
  };

  // If session is loading, show a loading indicator
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <img
            src={session?.user?.schoolLogo || "/logo.png"}
            alt="School Logo"
            className="w-20 h-20 mx-auto mb-6 animate-pulse"
            style={{ animation: "scaleAnimation 1s infinite" }}
          />
          <p>Loading...</p>
        </div>
        <style jsx>{`
          @keyframes scaleAnimation {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.5);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 max-sm:hidden">
        <Link
          href="/dashboard"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          {session?.user?.schoolLogo ? (
            <img
              src={String(session.user.schoolLogo)}
              alt="LOGO"
              width={32}
              height={32}
              onError={(e) => {
                e.currentTarget.src = "/logo.png";
              }}
            />
          ) : (
            <img src="/logo.png" alt="LOGO" width={32} height={32} />
          )}

          <span className="hidden lg:block font-bold">
            {String(
              session?.user?.schoolShortName ||
                session?.user?.schoolName ||
                "School Mgmt"
            )}{" "}
          </span>
        </Link>
        <Menu />
      </div>

      {/* RIGHT */}
      <div className="w-[86%] max-w-full overflow-x-hidden md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col max-sm:w-full">
        <MobileMenu />
        <Navbar />
        {children}
      </div>
    </div>
  );
}
