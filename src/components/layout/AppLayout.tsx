import React from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

import Pattern from "@/assets/pattern.svg";
import { useTokenStore } from "@/store";

interface Props {
  children?: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const primaryColor = useTokenStore((state) => state.primaryColor);
  return (
    <main
      style={{ backgroundColor: primaryColor }}
      className="p-2 md:p-4  min-h-screen w-full flex"
    >
      <div
        style={{ backdropFilter: "blur(20px)" }}
        className="bg-background text-dark-400 h-[calc(100vh- 8px)] md:h-[calc(100vh- 16px)] w-full rounded-3xl p-2 md:p-4 flex flex-col gap-4"
      >
        <AppHeader />
        <div
          style={{
            backgroundImage: `url(${Pattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative container mx-auto flex-1"
        >
          {children}
        </div>
        <AppFooter />
      </div>
    </main>
  );
}
