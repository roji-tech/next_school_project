import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { handleSignOut } from "../utils/authHelpers";

const AppBar = () => {
  const { data: session, status, update } = useSession();
  // console.log({ session });

  return (
    <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5 ">
      <Link className="text-sky-600 hover:text-sky-700" href={"/"}>
        Home
      </Link>

      <Link className="text-sky-600 hover:text-sky-700" href={"/admin"}>
        Admin Panel
      </Link>
      <Link className="text-sky-600 hover:text-sky-700" href={"/student"}>
        Student Panel
      </Link>
      <div className="ml-auto flex gap-2">
        {status}
        {status == "loading" ? (
          "......"
        ) : (
          <>
            {(status == "unauthenticated") |
            !session?.user |
            !session?.user?.accessToken ? (
              <button className="text-green-600" onClick={() => signIn()}>
                Sign In
              </button>
            ) : (
              <>
                <p className="text-sky-600"> {session.user.name}</p>
                <button className="text-red-500" onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppBar;
