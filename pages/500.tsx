import React from "react";
import Layout from "@/components/Layout";

export default function Custom500() {
  return (
    <Layout>
      <p className="text-7xl sm:text-9xl text-amber-900 text-center">
        🚧 500 🚧
      </p>
      <p className="text-xl sm:text-2xl text-amber-900 text-center">
        Server Error
      </p>
    </Layout>
  );
}
