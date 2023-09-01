import React, { useState } from "react";
import Layout from "@/components/Layout";
import Results from "@/components/Results";
import styles from "../styles/loading-dots.module.css";

export default function Travel() {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState();
  const [occasion, setOccasion] = useState("");
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function onSubmit(event: any) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/language", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ sentence, language }),
      });

      const data = await response.json();
      console.log("data", data);

      setResult("Garfunkle says... \n" + data.result.replaceAll("\n", "<br/>"));
    } catch (error) {
      console.error(error);
      alert(`Having a brainfart 🚽... Give me a moment`);
    } finally {
      setLoading(false);
    }
  }
  //   console.log(sentence, language);
  return (
    <Layout>
      <p className="text-6xl">🌎</p>
      <p className="text-5xl sm:text-6xl mb-6 sm:mb-12 text-blue-900 font-bold">
        Travel
      </p>

      <div className="w-96 flex flex-col justify-center items-center gap-y-5">
        <div className="flex flex-col w-3/4 ">
          <label className="text-black">Where are you going?</label>
          <input className="bg-white border-2 border-black w-full" />
        </div>
        <div className="flex flex-col w-3/4 ">
          <label className="text-black">How many days?</label>
          <input className="bg-white border-2 border-black w-full" />
        </div>
        <div className="flex flex-col w-3/4 ">
          <label className="text-black">Whats the occasion?</label>
          <input className="bg-white border-2 border-black w-full" />
        </div>
        <div className="flex flex-col w-3/4 ">
          <label className="text-black">Whats the minimum budget?</label>
          <input className="bg-white border-2 border-black w-full" />
        </div>
        <div className="flex flex-col w-3/4 ">
          <label className="text-black">Whats the maximum budget?</label>
          <input className="bg-white border-2 border-black w-full" />
        </div>
      </div>

      {/* <p className="text-black mb-4">Write the English sentence</p>
      <div className="w-full lg:w-1/3 px-5 flex flex-col justify-center items-center">
        <textarea
          className="bg-white w-full text-black mb-4 py-3 px-2 border-2 resize-none rounded-md"
          rows={4}
          placeholder="eg. Can I get one Carne Asada Burrito"
          name="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
        ></textarea>
        <select
          className="bg-white w-full text-black mb-4 py-3 px-2 border-2 rounded-md"
          name="gender"
          value={language}
          required
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="" defaultValue={""} disabled>
            Select language to translate into...
          </option>
          <option value="spanish">🇲🇽 Spanish</option>
          <option value="italian">🇮🇹 Italian</option>
          <option value="french">🇫🇷 French</option>
          <option value="tagalog">🇵🇭 Tagalog</option>
          <option value="korean">🇰🇷 Korean</option>
          <option value="urdu">🇮🇳 Hindi</option>
          <option value="urdu">🇮🇳 Urdu</option>
        </select>
        <button
          className="font-medium w-full py-3 px-2 mb-10 bg-blue-900 text-white  rounded-lg border-2 hover:text-white hover:border-blue-900 hover:font-semibold hover:bg-green-600"
          onClick={onSubmit}
        >
          Make me literate! 💬
        </button> */}

      {loading && <span className={styles.dot}>hi</span>}
      {result && !loading && <Results result={result} />}
      {/* </div> */}
    </Layout>
  );
}
