import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import load from "../public/load.gif";
import gift from "../public/gift.jpeg";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<number>(0);
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(0);
  // const [setBudget]
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");
  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <Head>
        <title>Gift Idea Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className="flex flex-col items-center">
        {/* <Image src={gift} alt="gift" className="w-[35px]" /> */}
        <p className="text-center text-6xl">💡</p>
        <p className="text-5xl sm:text-6xl text-indigo-700 text-center font-bold pb-10">
          Let&apos;s Brainstorm Gifts
        </p>
        <form className="flex flex-col w-96 items-center">
          <div className="flex flex-col justify-center w-3/4 items-start">
            <label className="text-black mb-1">What is this?</label>
            <select
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-indigo-500/50 rounded-md"
              name="gender"
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="adult">Adult</option>
              <option value="child">Child</option>
              <option value="pet">Pet</option>
            </select>
          </div>
          <div className="flex flex-col justify-center w-3/4 items-start">
            <label className="text-black mb-1">Age</label>
            <input
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-indigo-500/50 rounded-md"
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
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-indigo-500/50 rounded-md"
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
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-indigo-500/50 rounded-md"
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
              className="bg-white text-black mb-4 w-full py-3 px-2 border-2 border-indigo-500/50 rounded-md"
              type="text"
              name="interests"
              placeholder="eg: Rock Climbing, Boxing, Kareoke"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
          {/* <input
            className="text-black"
            type="submit"
            value="Generate gift ideas"
          /> */}
          <button className="text-white font-medium bg-indigo-700 mt-4 w-2/4 py-3 px-2 rounded-lg">
            Generate gift ideas
          </button>
        </form>
        <Image src={load} alt="loading" className="w-2/4" />
        {/* {loading && (
          <div>
            <p>I`&apos m thinking...</p>
            <Image src={load} alt="loading" className="" />
          </div>
        )}
        {result && !loading && (
          <div className="" dangerouslySetInnerHTML={{ __html: result }} />
        )} */}
      </main>
    </div>
  );
}
