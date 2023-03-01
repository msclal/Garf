import React from "react";
import Link from "next/link";
export default function Back() {
  return (
    <div>
      <Link
        href="/"
        className="text-black text-xl sm:text-2xl hover:font-medium align-baseline absolute top-6 left-5 md:left-10 cursor-pointer hover:underline"
      >
        &larr; Home
      </Link>
    </div>
  );
}
