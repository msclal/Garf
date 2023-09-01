import React from "react";
import { ProjectCard } from "components/ProjectCard";
import Heinz from "../public/heinz.svg";
import Sauces from "../public/sauces1.svg";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  const cards = [
    // {
    //   title: "Santa",
    //   description: "Suggest gift ideas for that special someone",
    //   color: "hover:bg-green-100",
    // },
    {
      title: "BILL",
      description: "Calculate bill split with the girls and gals",
      color: "hover:bg-red-100",
    },
    {
      title: "STATS",
      description: "Check your ENGR180w sentence stats",
      color: "hover:bg-blue-100",
    },
    // {
    //   title: "Flusher",
    //   description: "Rewrite sentences when you're feeling illiterate",
    //   color: "hover:bg-blue-100",
    // },
    // {
    //   title: "Translator",
    //   description: "Speak in tongues and be one with the people",
    //   color: "hover:bg-green-100",
    // },
  ];
  return (
    <div className="flex flex-col items-center">
      <Image
        src={Heinz}
        alt="heinz"
        priority
        draggable={false}
        className="absolute max-xl:hidden top-0 right-0 z-0 w-[30rem]"
      />
      <p className="text-amber-900 text-7xl sm:text-9xl font-bold relative z-10">
        GarfAI
      </p>
      <p className="text-black sm:text-xl relative z-10 ">
        Streamlining the College Workflow
      </p>
      <div className="z-3 flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mt-5 sm:mt-10">
        {cards.map(({ title, description, color }) => (
          <ProjectCard
            key={title}
            title={title}
            description={description}
            color={color}
          />
        ))}
      </div>
      <Link
        href={"https://github.com/msclal"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 absolute bottom-10 text-xs underline cursor-pointer sm:hover:text-gray-400 duration-300"
      >
        Follow Mika on Github
      </Link>
    </div>
  );
}
