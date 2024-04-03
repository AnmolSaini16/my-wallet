import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  actionConent: React.ReactNode;
}

const CardWrapper = ({
  title,
  actionConent,
  children,
  className,
  ...props
}: Props) => {
  return (
    <Card className={cn("h-[calc(100vh-285px)]", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {actionConent}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
