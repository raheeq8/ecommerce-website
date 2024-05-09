'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathName = usePathname()
  return (
    <div className="h-screen left-0 top-0 p-10 sticky flex flex-col gap-16 bg-blue-200 shadow-xl max-lg:hidden">
      <Image src={"/logo.png"} alt="logo" width={150} height={70} />
      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            className={`flex gap-4 text-body-medium ${pathName === link.url ? " text-blue-800" : ""}`}
            key={link.label}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center">
        <UserButton/>
        <p>Edit Pofile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
