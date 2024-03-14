"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { appConstants } from "@/constants/appConstants";
import { cn } from "@/lib/utils";

const NavLinks = () => {
  const path = usePathname();

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      {appConstants.NAV_LINKS.map((navItem) => (
        <Link
          key={navItem.name}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            path === navItem.link ? "" : "text-muted-foreground "
          )}
          href={navItem.link}
        >
          {navItem.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
