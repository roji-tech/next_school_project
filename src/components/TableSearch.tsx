"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

interface TableSearchProps {
  onSearch?: (value: string) => void;
}

const TableSearch = ({ onSearch }: TableSearchProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
        onChange={handleSearch}
      />
    </div>
  );
};

export default TableSearch;
