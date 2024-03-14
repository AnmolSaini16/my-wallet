import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

const MainShell = ({
  children,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: Props) => {
  return (
    <div className={cn(className, "p-4")} {...props}>
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex flex-row items-center gap-2">
          {secondaryAction ? secondaryAction : null}
          {primaryAction ? primaryAction : null}
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainShell;
