"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/useLockBody";
import { appConstants } from "@/constants/appConstants";
import { usePathname } from "next/navigation";
import Logo from "../Logo";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {}

export function MobileNav({}: MobileNavProps) {
  const path = usePathname();
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          <Logo className="p-2 text-sm" />
          <Separator className="my-2" />
          {appConstants.NAV_LINKS.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={cn(
                "flex w-full items-center p-2 text-sm font-medium transition-colors hover:text-primary",
                path === item.link ? "" : "text-muted-foreground "
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
