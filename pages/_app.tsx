import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-white flex flex-col justify-center items-center w-full min-h-screen">
      <Component {...pageProps} />;{/* </Layout> */}
    </main>
  );
}
