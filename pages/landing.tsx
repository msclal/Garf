import React from "react";
import { ProjectCard } from "components/ProjectCard";

export default function Landing() {
  const cards = [
    {
      title: "Santa",
      description: "Suggest gift ideas for that special someone",
    },
    {
      title: "Flush",
      description: "Rewrite sentences when you're feeling illiterate",
    },
    {
      title: "Bill",
      description: "Calculate the bill split with the homies",
    },
  ];
  return (
    <div className="w-3/4 flex flex-col pt-20 justify-start items-center">
      <p className="text-amber-900 text-7xl sm:text-9xl font-bold">Garf AI</p>
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mt-20">
        {cards.map(({ title, description }) => (
          <ProjectCard key={title} title={title} description={description} />
        ))}
      </div>
    </div>
  );
}
