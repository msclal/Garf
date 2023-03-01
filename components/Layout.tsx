import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export function Layout({ children }: Props) {
  return (
    <main className="bg-white flex flex-col justify-center items-center w-full min-h-screen">
      {children}
    </main>
  );
}
