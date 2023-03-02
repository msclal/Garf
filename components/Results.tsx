import React from "react";

interface Props {
  result: string;
}

export default function Results({ result }: Props) {
  return (
    <div className="flex justify-center mx-2 sm:mx-0">
      <div
        className="text-black w-fit p-4 bg-slate-100 rounded-2xl border-2 border-black drop-shadow-lg flex justify-center"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
}
