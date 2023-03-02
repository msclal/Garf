import React from "react";
import { ProjectCard } from "components/ProjectCard";
import Heinz from "../public/heinz.svg";
import Sauces from "../public/sauces1.svg";
import Image from "next/image";

export default function Landing() {
  const cards = [
    {
      title: "Santa",
      description: "Suggest gift ideas for that special someone",
      color: "green",
    },
    {
      title: "Flush",
      description: "Rewrite sentences when you're feeling illiterate",
      color: "blue",
    },
    {
      title: "Bill",
      description: "Calculate the bill split with the homies",
      color: "green",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <Image
        src={Heinz}
        alt="heinz"
        className="absolute hidden 2xl:block top-0 right-0 z-0"
      />
      <p className="text-amber-900 text-7xl sm:text-9xl font-bold">Garf AI</p>
      <div className="z-3 flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mt-5 sm:mt-20">
        {cards.map(({ title, description, color }) => (
          <ProjectCard
            key={title}
            title={title}
            description={description}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}
