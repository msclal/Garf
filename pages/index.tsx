import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import load from "../public/load.gif";
import gift from "../public/gift.jpeg";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [giftee, setGiftee] = useState("");
  const [age, setAge] = useState<number>(20);
  const [priceMin, setPriceMin] = useState<number>(30);
  const [priceMax, setPriceMax] = useState<number>(50);
  const [interests, setInterests] = useState("Star Wars, Cars");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function onSubmit(event: any) {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ giftee, age, priceMin, priceMax, interests }),
      });

      const data = await response.json();
      console.log("data", data);
      if (!response.ok) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.statusText}`)
        );
      }

      setResult("Garf says..." + data.result.replaceAll("\n", "<br/>"));
    } catch (error) {
      console.error(error);
      alert(`Having a brainfart 🚽... Give me a moment`);
    } finally {
      setLoading(false);
    }
  }

  console.log(giftee, age, priceMin, priceMax, interests, loading);
  return (
    <div className="min-h-screen flex justify-center items-start py-20">
      <Head>
        <title>Gift Idea Generator</title>
        <link rel="icon" href="/gift.jpeg" />
      </Head>
      <main className="flex flex-col items-center">
        {/* <Image src={gift} alt="gift" className="w-[35px]" /> */}
        <p className="text-center text-6xl">💡</p>
        <p className="text-5xl sm:text-6xl text-[#449982] text-center font-bold pb-10">
          Let&apos;s Brainstorm Gifts
        </p>
        <form className="flex flex-col w-96 items-center" onSubmit={onSubmit}>
          <div className="flex flex-col justify-center w-3/4 items-start">
            <label className="text-black mb-1">What is this?</label>
            <select
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-black/50 rounded-md"
              name="gender"
              value={giftee}
              required
              onChange={(e) => setGiftee(e.target.value)}
            >
              <option
                value=""
                selected
                disabled
                hidden
                placeholder="Choose a type of living being"
              >
                Choose a type of living being
              </option>
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="pet">Pet</option>
            </select>
          </div>
          <div className="flex flex-col justify-center w-3/4 items-start">
            <label className="text-black mb-1">Age</label>
            <input
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-black/50 rounded-md"
              type="number"
              min={1}
              max={99}
              name="age"
              placeholder="22"
              value={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col justify-center w-3/4 items-start">
            <label className="text-black mb-1">Mininum budget ($)</label>
            <input
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-black/50 rounded-md"
              type="number"
              min={1}
              name="priceMin"
              placeholder="30"
              value={priceMin}
              required
              onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col justify-center w-3/4 items-start">
            <label className="text-black mb-1">Maximum budget ($$)</label>
            <input
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-black/50 rounded-md"
              type="number"
              min={1}
              name="priceMax"
              placeholder="50"
              value={priceMax}
              required
              onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col justify-center w-3/4 items-start">
            <label className="text-black mb-1">Interests</label>
            <input
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-black/50 rounded-md"
              type="text"
              name="interests"
              placeholder="eg: Rock Climbing, Boxing, Kareoke"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
          <input
            className="text-white font-medium bg-[#449982] mt-4 w-2/4 py-3 px-2 rounded-lg border-2 border-black cursor-pointer"
            type="submit"
            value="Generate gift ideas"
          />
        </form>
        {loading && (
          <div>
            <p>I`&apos m thinking...</p>
            <Image src={load} alt="loading" className="" />
          </div>
        )}
        {result && !loading && (
          <div
            className="text-black w-1/2  max-w-2/3 mt-10 p-4 bg-slate-100 rounded-2xl border-2 border-black"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        )}
      </main>
    </div>
  );
}
