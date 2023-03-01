import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import load from "../public/load.gif";
import { useRouter } from "next/router";
import Results from "components/Results";

export default function Gifts() {
  const [giftee, setGiftee] = useState("Man");
  const [age, setAge] = useState<number>(19);
  const [priceMin, setPriceMin] = useState<number>(10);
  const [priceMax, setPriceMax] = useState<number>(50);
  const [interests, setInterests] = useState("porn, video games");
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

      setResult("Santa Garf says..." + data.result.replaceAll("\n", "<br/>"));
    } catch (error) {
      console.error(error);
      alert(`Having a brainfart 🚽... Give me a moment`);
    } finally {
      setLoading(false);
    }
  }

  console.log(giftee, age, priceMin, priceMax, interests, loading);
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-6xl">💡</p>
      <p className="text-5xl sm:text-6xl text-[#449982] text-center font-bold pb-10">
        Santa Garf
      </p>
      {!loading && !result && (
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
              <option value="" disabled hidden>
                Choose one...
              </option>
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="gay">Gay</option>
              <option value="bisexual">Bisexual</option>
              <option value="lesbian">Lesbian</option>
              <option value="lesbian">Asexual</option>
              <option value="animal">Pet</option>
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
            className="text-white font-medium bg-[#449982] hover:bg-[#f75627] hover:font-semibold mt-4 w-2/4 py-3 px-2 rounded-lg border-2 border-black cursor-pointer"
            type="submit"
            value="Generate ideas"
          />
        </form>
      )}
      {loading && (
        <div className="flex flex-col items-center">
          <Image src={load} alt="loading" className="m-0" />
          <p className="text-black mt-5 text-2xl">Garf Garf is thinking...</p>
        </div>
      )}
      {result && !loading && <Results result={result} />}
      {result && (
        <button
          className="text-black text-2xl hover:font-semibold mt-10"
          onClick={() => setResult("")}
        >
          &larr; Go Back
        </button>
      )}
      {interests}
    </div>
  );
}
