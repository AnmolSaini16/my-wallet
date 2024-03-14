"use client";

import React from "react";
import NavLinks from "./NavLinks";
import NavMenu from "./NavMenu";
import Logo from "../Logo";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";

type Props = {
  userNav?: boolean;
};

const NavBar = ({ userNav = true }: Props) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  return (
    <nav className="flex h-16 items-center px-4 border-b justify-between">
      <div className="hidden md:flex items-center">
        <div className="border-r pr-3 mr-3">
          <Logo className="text-xl" />
        </div>
        <div>{userNav && <NavLinks />}</div>
      </div>

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu && <X />}
        <span className="font-bold">Menu</span>
      </button>

      <div className="flex items-center gap-4">
        {userNav && (
          <Button
            id="date"
            variant="outline"
            className="w-[200px] justify-start text-left font-normal hidden sm:flex"
            disabled
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(new Date().toISOString(), "PPP")}
          </Button>
        )}
        <NavMenu />
      </div>
      {showMobileMenu && <MobileNav />}
    </nav>
  );
};

export default NavBar;
