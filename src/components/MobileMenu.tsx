"use client";

import { useState } from "react";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "./Menu";
import { useSession } from "next-auth/react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Button */}
      {!isOpen && (
        <div>
          <button
            onClick={toggleSidebar}
            className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full max-w-[75%] w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out sm:hidden z-40`}
      >
        {/* Sidebar Header */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex gap-2 items-center">
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
            {/* <span className="hidden lg:block font-bold ml-2">School Mgmt</span> */}
            <span className="font-semibold text-ellipsis max-w-[80%]">
              {String(
                session?.user?.schoolShortName ||
                  session?.user?.schoolName ||
                  "School Mgmt"
              )}
            </span>
          </div>

          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="mt-4 text-sm">
          {menuItems.map((i) => (
            <div className="flex flex-col gap-2 px-4" key={i.title}>
              <span className="text-gray-400 font-light my-4">{i.title}</span>
              {i.items.map((item) => {
                if (item.visible.includes(role)) {
                  return (
                    <Link
                      href={item.href}
                      key={item.label}
                      className="flex items-center gap-4 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100"
                      onClick={toggleSidebar}
                    >
                      <Image src={item.icon} alt="" width={20} height={20} />
                      <span className="block">{item.label}</span>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
