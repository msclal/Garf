import React from "react";
import Layout from "@/components/Layout";
export default function Custom404() {
  return (
    <Layout>
      <p className="text-7xl sm:text-9xl text-amber-900 text-center">
        🔎 404 🔦
      </p>
      <p className="text-xl sm:text-2xl text-amber-900  text-center">
        Page Not Found
      </p>
    </Layout>
  );
}
