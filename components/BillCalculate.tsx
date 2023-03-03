import React, { Dispatch, SetStateAction } from "react";

interface Props {
  state: {
    split?: string | undefined;
    bill?: number | undefined;
    tax?: number | undefined;
    tipPercent?: number | undefined;
    numPeople?: number | undefined;
  };
}

export default function BillForm({ state }: Props) {
  const { split, bill, tax, tipPercent, numPeople } = state;
  const totalBill = bill! + tax!;
  const tip = Number(((totalBill * tipPercent!) / 100).toFixed(2));
  let costPerPerson = "0";

  if (split === "even") {
    costPerPerson = "$" + ((totalBill + tip!) / numPeople!).toFixed(2);
  } else {
    costPerPerson = "Meal + $" + ((tip + tax!) / numPeople!).toFixed(2);
  }
  console.log(costPerPerson);
  return (
    <div className="mx-4">
      <div className="flex justify-around mb-8">
        <div className="flex flex-col items-center">
          <p className="text-black">Total Bill</p>
          <p className="text-black text-3xl">${totalBill || 0}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-black">Total Tip</p>
          <p className="text-black text-3xl">${tip || 0}</p>
        </div>
      </div>
      <div className="flex flex-col items-center rounded-md">
        <p className="font-bold text-red-700">Total Cost Per Person</p>
        <p className="text-3xl font-bold text-red-700">
          {costPerPerson || "0"}
        </p>
      </div>
    </div>
  );
}

{
  /* <div>
        <p className="label">Total Tip</p>{" "}
        <p className="result">{`$ ${totalTip}`}</p>
      </div>
      <div>
        <p className="label">Tip per Person</p>{" "}
        <p className="result">{`$ ${Number(totalTip / noOfPerson).toFixed(
          2
        )}`}</p>
      </div> */
}
