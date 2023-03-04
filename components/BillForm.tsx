import React, { Dispatch, SetStateAction, useState } from "react";
import Layout from "./Layout";

// using undefined instead of null so form inputs can accept empty values
interface Props {
  state: {
    split: string | null;
    bill: number | null;
    tax: number | null;
    tipPercent: number | null;
    numPeople: number | null;
  };
  onUpdateState: Dispatch<SetStateAction<object>>;
}

export default function BillForm({ state, onUpdateState }: Props) {
  const { split, bill, tax, tipPercent, numPeople } = state;
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
              value={split || ""}
              className="text-blue-900 text-2xl hover:cursor-pointer"
              onChange={() => onUpdateState({ split: "even" })}
            />
            <label className="text-black mx-2">Even</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="split"
              value={split || ""}
              className="text-blue-900 text-2xl hover:cursor-pointer"
              onChange={() => onUpdateState({ split: "uneven" })}
            />
            <label className="text-black mx-2 text-2xl">Uneven</label>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <p className="text-black mb-1">Base Subtotal ($)</p>
            <input
              name="bill"
              value={bill || ""}
              type="number"
              required
              className="bg-white text-black mb-4 w-11/12 py-3 px-2 border-2 border-black/50 rounded-md"
              onChange={(e) => {
                const x = e.target.value.replace(/^[-+]?[0-9]+\.[^0-9]+$/, "");
                onUpdateState({
                  bill: Number(x) < 0 ? 0 : x,
                  // bill: Number(
                  //   (
                  //     Math.round(parseFloat(e.target.value) * 100) / 100
                  //   ).toFixed(2)
                  // ),
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-black mb-1">Tax ($)</p>
            <input
              name="tax"
              value={tax || ""}
              type="number"
              required
              className="bg-white text-black mb-4 w-11/12 py-3 px-2 border-2 border-black/50 rounded-md"
              onChange={(e) => {
                const x = e.target.value.replace(/^[-+]?[0-9]+\.[^0-9]+$/, "");
                onUpdateState({
                  tax: Number(x) < 0 ? 0 : x,
                  // tax: Number(
                  //   (
                  //     Math.round(parseFloat(e.target.value) * 100) / 100
                  //   ).toFixed(2)
                  // ),
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
              const p = e.target.value.replace(/^[-+]?[0-9]+\.[^0-9]+$/, "");
              onUpdateState({
                // tipPercent: p,
                tipPercent:
                  Number(p) < 0 ? 0 : Number(p) > 100 ? 100 : Number(p),
              });
              // const p = Number(e.target.value);
              // onUpdateState({
              //   tipPercent: p < 0 ? 0 : p > 100 ? 100 : p,
              // });
            }}
            value={tipPercent || ""}
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
            value={numPeople || ""}
            type="number"
            required
            className="bg-white text-black mb-8 w-1/2 py-3 px-2 border-2 border-black/50 rounded-md"
            onChange={(e) => {
              const ppl = Number(
                Math.round(parseFloat(e.target.value) * 100) / 100
              ).toFixed(0);
              onUpdateState({
                numPeople: Number(ppl) < 0 ? 0 : ppl,
              });
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
