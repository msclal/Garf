import React, { useState } from "react";
import Layout from "@/components/Layout";
import Results from "@/components/Results";

export default function Flush() {
  const [sentence, setSentence] = useState(
    "How many hours do you think it should be done"
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function onSubmit(event: any) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/sentence", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ sentence }),
      });

      const data = await response.json();
      console.log("data", data);

      //   if (!response.ok) {
      //     throw (
      //       data.error ||
      //       new Error(`Request failed with status ${response.statusText}`)
      //     );
      //   }
      setResult("Garfunkle says..." + data.result.replaceAll("\n", "<br/>"));
    } catch (error) {
      console.error(error);
      alert(`Having a brainfart 🚽... Give me a moment`);
    } finally {
      setLoading(false);
    }
  }
  console.log(sentence);
  return (
    <Layout>
      <p className="text-6xl">🚽</p>
      <p className="text-5xl sm:text-6xl mb-6 sm:mb-12 text-amber-900 font-bold">
        Flusher
      </p>
      <p className="text-black mb-4">Write the 💩 sentence</p>
      <div className="w-full lg:w-1/3 px-5">
        <textarea
          className="bg-white w-full text-black mb-4 py-3 px-2 border-2 resize-none"
          rows={2}
          placeholder="eg. How many hours do you think that is"
          name="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        ></textarea>
        <button
          className="font-medium w-full py-3 px-2  bg-amber-900 text-white  rounded-lg border-2 hover:text-black hover:border-amber-900 hover:font-semibold hover:bg-blue-300"
          onClick={onSubmit}
        >
          Literate Me! 🫧
        </button>
        {/* <p className="text-black text-4xl">{result}</p> */}
      </div>
      {result && !loading && <Results result={result} />}
    </Layout>
  );
}
