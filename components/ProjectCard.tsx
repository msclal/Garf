import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  color: string;
}

export const ProjectCard = ({ title, description, color }: Props) => {
  return (
    <Link
      href={`${title.toLocaleLowerCase()}`}
      className={`flex flex-col border-2 items-center border-black md:py-10 w-64 md:max-w-1/4 my-3 mx-10 rounded-xl cursor-pointer hover:border-amber-900 ${color} p-4`}
    >
      {/* <div className="flex flex-col border-2 items-center border-amber-900 py-16 w-full md:w-1/4 my-3 rounded-xl cursor-pointer hover:bg-green-100"> */}
      <p className="text-amber-900 font-semibold text-3xl text-center mb-2">
        {title}
      </p>
      <p className="text-black text-xl text-center">{description}</p>
      {/* </div> */}
    </Link>
  );
};
