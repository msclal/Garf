import React from "react";
import Link from "next/link";
export default function Back() {
  return (
    <div>
      <Link
        href="/"
        className="text-amber-900 text-xl sm:text-2xl hover:font-semibold align-baseline absolute top-6 left-5 md:left-10 cursor-pointer"
      >
        &larr; Home
      </Link>
    </div>
  );
}
