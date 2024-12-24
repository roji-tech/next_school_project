import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "./Menu";

const MobileMenu = () => {
  return (
    <div className="mt-4 text-sm fixed">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-schSkyLight"
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
  );
};

export default MobileMenu;
