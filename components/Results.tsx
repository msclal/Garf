import React from "react";

interface Props {
  result: string;
}

export default function Results({ result }: Props) {
  return (
    <div className="lg:w-2/5 flex justify-center">
      <div
        className="text-black w-fit sm:w-fit p-4 m-10 bg-slate-100 rounded-2xl border-2 border-black drop-shadow-lg flex justify-center"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
}
