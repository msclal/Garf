import React from "react";

export default function Results({ result }: { result: string }) {
  return (
    <div
      className="text-black w-96 sm:w-1/2 mt-10 p-4 bg-slate-100 rounded-2xl border-2 border-black drop-shadow-lg"
      dangerouslySetInnerHTML={{ __html: result }}
    />
  );
}
