"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLink?: boolean;
}

const Logo = ({ isLink = true, ...props }: Props) => {
  return (
    <div>
      {isLink ? (
        <Link href="/" className={cn(`font-semibold`, props.className)}>
          {logoText}
        </Link>
      ) : (
        <div className={cn(`font-semibold`, props.className)}>{logoText}</div>
      )}
    </div>
  );
};

export default Logo;

const logoText = (
  <>
    My<span className="text-green-400">Wallet</span>
  </>
);
