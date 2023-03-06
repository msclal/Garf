import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Results from "@/components/Results";
import styles from "../styles/loading-dots.module.css";

export default function Stats() {
  const [text, setText] = useState<string>("");
  const [sentencesCount, setSentencesCount] = useState<number>();
  const [wordsPerSentence, setWordsPerSentence] = useState<number[]>([]);
  const [passiveCount, setPassiveCount] = useState<boolean[]>([]);
  const [pastCount, setPastCount] = useState<boolean[]>([]);

  const cleanup = () => {
    let t = text.replace(/(^\s*)|(\s*$)/gi, "");
    t = t.replace(/[ ]{2,}/gi, " ");
    t = t.replace(/\n /, "\n");
    if (
      t !== "" &&
      t.slice(-1) !== "." &&
      t.slice(-1) !== "?" &&
      t.slice(-1) !== "!" &&
      t.slice(-1) !== ","
    ) {
      t = t.replace(/(?![.?!])$/, ".");
    }
    setText(t);
  };

  const countSentences = () => {
    setSentencesCount(text?.match(/[\w|\)][.?!](\s|$)/g)?.length);
    // return t
  };
  const countWords = () => {
    // let t = text.replace(/(^\s*)|(\s*$)/gi, "");
    // // console.log("hi", t);
    // t = t.replace(/[ ]{2,}/gi, " ");
    // t = t.replace(/\n /, "\n");
    const sentences = text.split(/[.?!]/).slice(0, -1);
    console.log("split", sentences);
    const wordCount = sentences.map(
      (sentence) => sentence.trim().split(/[\s:]+/).length
    );
    // console.log("words", wordCount);
    setWordsPerSentence(wordCount);
    // let t = text.split(" ").length;
    // for (let i = 0; i < text.length; i++) {
    //   setWordsPerSentence(i.split(" ").length);
    // }
  };

  const isPassive = () => {
    const passiveRegex =
      /\b((be(en)?)|(w(as|ere))|(is)|(a(er|m)))(.+(en|ed))([\s]|\.)/g;
    // /(\b(am|is|are|was|were|be|been|being)\b\s+[\w\s]*\b(\w+ed)\b)/i;
    const sentences = text.toLowerCase().split(/[.?!]/).slice(0, -1);
    const passive = sentences.map((sentence) => passiveRegex.test(sentence));
    setPassiveCount(passive);
  };
  const isPresent = () => {
    const notActiveWords =
      /\b(had|been|was|were|will|could|would|became|bought|came|did|grew|went|led|knew|saw|thought)\b/gi;
    const sentences = text.toLowerCase().split(/[.?!]/).slice(0, -1);
    const present = sentences.map((sentence) => notActiveWords.test(sentence));
    setPastCount(present);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    countSentences();
    // let t = text.split(/[.?!]/);
    countWords();
    isPassive();
    isPresent();
    // console.log(t);
  };
  console.log(text);
  console.log("sentence", sentencesCount);
  console.log("word", wordsPerSentence);
  console.log("passive", passiveCount);
  console.log("active", pastCount);
  return (
    <Layout>
      <div className="flex justify-evenly items-center w-full flex-wrap px-10 lg:px-20">
        {/* <div className="flex flex-col justify-center items-center">
          <p className="text-6xl">🚽</p>
          <p className="text-5xl sm:text-6xl mb-6 sm:mb-12 text-amber-900 font-bold">
            Flusher
          </p>
        </div> */}
        <div className="flex flex-col w-full lg:w-2/3 lg:mt-0 mt-28 justify-center items-center">
          {/* <div className="flex flex-col justify-center items-center"> */}
          <p className="text-6xl">📊</p>
          <p className="text-5xl sm:text-6xl mb-6 sm:mb-12 text-blue-600 font-bold">
            180w
          </p>
          {/* </div> */}
          <p className="text-black mb-4">Paste your 💩 text</p>
          <div className="flex flex-col w-full justify-center items-center">
            <textarea
              className="bg-white w-full text-black mb-4 py-3 px-2 border-2 resize-none rounded-md"
              rows={10}
              placeholder="eg. Hello World"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={cleanup}
            ></textarea>
            {/* <select
          className="bg-white w-full text-black mb-4 py-3 px-2 border-2 rounded-md"
          name="gender"
          value={style}
          required
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value="" selected disabled>
            Select sentence style...
          </option>
          <option value="academic">Academic</option>
          <option value="professional">Profesional</option>
          <option value="biblical">Biblical</option>
          <option value="gay slang">Colloquial</option>
          <option value="articulae">
            I am fully illiterate. Just articulate this.
          </option>
        </select> */}
            <button
              className="font-medium w-full py-3 px-2 mb-10 bg-blue-600 text-white  rounded-lg border-2 hover:text-black hover:border-red-900 hover:font-semibold hover:bg-red-400"
              onClick={handleSubmit}
            >
              Check My Stats
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center bg-slate-100 rounded-md border-2 border-black p-4 pb-1 shadow-lg">
          <p className="text-black text-xl font-bold text-center">
            Text Statistics
          </p>
          {sentencesCount && (
            <p
              className={`mb-6 mt-6 text-center ${
                sentencesCount > 5 ? `text-red-500` : `text-black`
              }`}
            >
              {sentencesCount} Sentences
            </p>
          )}
          <div>
            <div className="flex flex-col mb-6">
              <ol className="text-black">
                <p className="text-black font-semibold">Words Per Sentence</p>
                {wordsPerSentence.map((count, index) => (
                  <li
                    key={index}
                    className={`${count > 25 ? `text-red-500` : `text-black`}`}
                  >
                    {`Sentence ${index + 1} has ${count} words`}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col mb-6">
              <ol className="text-black">
                <p className="text-black font-semibold">Active Sentence </p>
                {passiveCount.map((res, index) => (
                  <li
                    key={index}
                    className={`${res ? `text-red-500` : `text-black`}`}
                  >
                    {`Sentence ${index + 1} - ${res ? "Passive?" : "yes"}`}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col mb-3">
              <ol className="text-black">
                <p className="text-black font-semibold">Present Tense </p>
                {pastCount.map((res, index) => (
                  <li
                    key={index}
                    className={`${res ? `text-red-500` : `text-black`}`}
                  >
                    {`Sentence ${index + 1} - ${res ? "Past/Future" : "yes"}`}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
