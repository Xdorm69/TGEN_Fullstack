import { cn } from "@/lib/utils";
import React from "react";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `max-w-6xl py-4 px-2 md:px-4 lg:px-2 mx-auto`,
        className && `${className}`,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
