import React from "react";
import Back from "@/components/Back";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export default function Layout({ children }: Props) {
  return (
    <div className="bg-white flex flex-col justify-center items-center w-full min-h-fit">
      <Back />
      {children}
    </div>
  );
}
