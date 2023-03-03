import React, { Dispatch, SetStateAction, useState } from "react";
import Layout from "./Layout";

// using undefined instead of null so form inputs can accept empty values
interface Props {
  state: {
    split: string | undefined;
    bill: number | undefined;
    tax: number | undefined;
    tipPercent: number | undefined;
    numPeople: number | undefined;
  };
  onUpdateState: Dispatch<SetStateAction<object>>;
}

export default function BillForm({ state, onUpdateState }: Props) {
  const { split, bill, tax, tipPercent, numPeople } = state;
  // const [split, setSplit] = useState("");
  const percentages = [10, 15, 20];
  return (
    <Layout>
      <p className="text-6xl">🦬</p>
      <p className="text-5xl sm:text-6xl mb-8 sm:mb-14 text-blue-900 font-bold">
        Buffalo Bill
      </p>
      <div className="mx-4">
        <p className="text-black mb-1">Select split method</p>
        <div className="flex mb-4 text-2xl justify-center">
          <div className="flex items-center mr-36">
            <input
              type="radio"
              name="split"
              value={split}
              // checked={true}
              className="text-blue-900 text-2xl hover:cursor-pointer"
              onChange={() => onUpdateState({ split: "even" })}
            />
            <label className="text-black mx-2">Even</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="split"
              value={split}
              className="text-blue-900 text-2xl hover:cursor-pointer"
              onChange={() => onUpdateState({ split: "uneven" })}
            />
            <label className="text-black mx-2 text-2xl">Uneven</label>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-black mb-1">Base Bill Total ($)</p>
            <input
              name="bill"
              value={bill}
              type="number"
              required
              className="bg-white text-black mb-4 w-11/12 py-3 px-2 border-2 border-black/50 rounded-md"
              onChange={(e) => {
                onUpdateState({
                  // bill: parseFloat(e.target.value),
                  bill: Number(
                    (
                      Math.floor(parseFloat(e.target.value) * 100) / 100
                    ).toFixed(2)
                  ),
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-black mb-1">Tax ($)</p>
            <input
              name="tax"
              value={tax}
              type="number"
              required
              className="bg-white text-black mb-4 w-11/12 py-3 px-2 border-2 border-black/50 rounded-md"
              onChange={(e) => {
                onUpdateState({
                  // tax: parseFloat(e.target.value),
                  tax: Number(
                    (
                      Math.floor(parseFloat(e.target.value) * 100) / 100
                    ).toFixed(2)
                  ),
                });
              }}
            />
          </div>
        </div>
        <p className="text-black mb-1">Tip %</p>
        <div className="flex flex-wrap justify-between items-center mb-4">
          {percentages.map((p) => {
            return (
              <div
                className={`text-black text-2xl border-2 border-black hover:bg-slate-100 rounded-md cursor-pointer w-fit p-3 ${
                  tipPercent === p ? `bg-slate-200` : ``
                }`}
                onClick={() => {
                  onUpdateState({ tipPercent: p });
                }}
                key={p}
              >{`${p}%`}</div>
            );
          })}
          <input
            className={`text-black text-2xl border-2 border-black hover:bg-slate-100 rounded-md cursor-pointer w-fit p-3 
            ${
              tipPercent !== 10 && tipPercent !== 15 && tipPercent !== 20
                ? `bg-slate-200`
                : `bg-white`
            }
            `}
            onChange={(e) => {
              const p = Number(
                (Math.floor(parseFloat(e.target.value) * 100) / 100).toFixed(2)
              );
              onUpdateState({
                tipPercent: p < 0 ? 0 : p > 100 ? 100 : p,
              });
            }}
            value={tipPercent}
            max={100}
            min={0}
            type="number"
            placeholder="XX"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-black mb-1">Number of People</p>
          <input
            name="tax"
            value={numPeople}
            type="number"
            required
            className="bg-white text-black mb-8 w-1/2 py-3 px-2 border-2 border-black/50 rounded-md"
            onChange={(e) => {
              const ppl = Number(
                Math.floor(parseFloat(e.target.value) * 100) / 100
              ).toFixed(0);
              onUpdateState({
                numPeople: ppl,
              });
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
