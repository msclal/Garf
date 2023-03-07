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
  const [showModal, setShowModal] = React.useState(false);

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
      /(\b(?:be|am|is|are|was|were|have|has|had|been)\b[\w\s]{0,15}?(?:d|(?!whe)n|ne|left|being)\b(?: by\b)?)/i;
    // /\b((be(en)?)|(w(as|ere))|(is)|(a(er|m)))(.+(en|ed))([\s]|\.)/g;
    // /(\b(am|is|are|was|were|be|been|being|will)\b\s+[\w\s]*\b(\w+ed|\w+en)\b)/i;
    // /(\b(am|is|are|was|were|be|been|being|will))(.+(en|ed))([\s]|\.)/g;
    const sentences = text.toLowerCase().split(/[.?!]/).slice(0, -1);
    console.log("sentences", sentences);
    const passive = sentences.map((sentence) =>
      passiveRegex.test(sentence.trim())
    );
    console.log(passive);
    setPassiveCount(passive);
  };
  const isPresent = () => {
    const notPresentWords =
      //   /\b(had|been|was|were|will|could|would|shouldn't|should|couldn't|could|wouldn't|would|became|bought|came|did|grew|went|led|knew|saw|thought)\b/i;
      /\b(had|been|was|were|will|could|would|should|became|did|went|knew|saw|thought|couldn't|couldnt|wouldn't|wouldnt|shouldn't|shouldnt)\b/i;
    // // const allowedPast =
    // //   /(\b(?:is|has|have|being|be|am|are)\b[\w\s]{0,15}?(?:d|(?!whe)n|ne|left|being)\b(?: by\b)?)/i;
    // const allowedPast = /(?<!is|has|have|being|be|am|are)\b\w+(en|ed)\b/i;
    const sentences = text.toLowerCase().split(/[.?!]/).slice(0, -1);
    const present = sentences.map((sentence) => notPresentWords.test(sentence));
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
  return (
    <Layout>
      {/* <> */}
      <div className="flex w-full justify-end mr-20">
        <button
          className="font-medium py-3 px-2 my-10 bg-blue-600 text-white rounded-lg border-2 hover:text-black hover:border-black hover:font-semibold hover:bg-red-400"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Help
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center sm:top-16 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto w-full">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    - Best use case: analyze one paragraph at a time.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    - Sets a flag when there are more than 5 sentences, word
                    count is over 25, passive voice or past/future tense is
                    detected.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    - Passive voice triggers when using
                    [am|is|are|was|were|be|been|being] + verb ending in [-ed |
                    -en]. This algorithm is a bit elementary/imperfect but
                    should (~most of the time) detect basic kinds of passive.
                  </p>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    - Past/Future tense strictly only triggers for common
                    non-present verbs: had, been, was, were, will, could, would,
                    became, knew, saw, thought. Not basing it off of words
                    ending in -ed or -en because they can be made present (eg. I
                    have eaten - present).
                  </p>
                  <p className="my-4 text-slate-500 font-semibold text-lg leading-relaxed">
                    - Note: They seem to allow passive sentences. It is hard to
                    talk about past events without following a sentence format
                    like bullet #3 anyways.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none hover:text-slate-400 mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

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
              Analyze
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
