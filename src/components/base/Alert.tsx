import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import AlertIcon from "../icons/AlertIcon";

interface Props {
  color?: string;
  children?: ReactNode;
  className?: string;
}

export default function Alert({
  color = "#ED6C02",
  className,
  children,
}: Props) {
  return (
    <div
      role="alert"
      className={cn(
        " text-xs  px-3 py-1.5 rounded-lg bg-[#FFF4E5] text-[#663C00] flex md:items-center gap-2",
        className
      )}
    >
      <AlertIcon fill={color} aria-hidden="true" />
      {children}
    </div>
  );
}
