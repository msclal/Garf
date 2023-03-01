import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
}

export const ProjectCard = ({ title, description }: Props) => {
  return (
    <Link
      href={`${title.toLocaleLowerCase()}`}
      className="flex flex-col border-2 items-center border-amber-900 py-16 w-full md:w-1/4 my-3 rounded-xl cursor-pointer hover:bg-green-100"
    >
      {/* <div className="flex flex-col border-2 items-center border-amber-900 py-16 w-full md:w-1/4 my-3 rounded-xl cursor-pointer hover:bg-green-100"> */}
      <p className="text-amber-900 font-semibold text-3xl text-center">
        {title}
      </p>
      <p className="text-amber-900 text-xl p-5 text-center">{description}</p>
      {/* </div> */}
    </Link>
  );
};
