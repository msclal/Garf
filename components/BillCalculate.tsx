import React from "react";

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

  //   const totalBill = Number((Number(bill!) + Number(tax!)).toFixed(2));
  //   const totalBill = Number((Math.floor((bill! + tax!) * 100) / 100).toFixed(2));

  const totalBill =
    bill && tax
      ? Number((Math.floor((bill! + tax!) * 100) / 100).toFixed(2))
      : bill || tax
      ? Number((Math.floor(bill! * 100) / 100).toFixed(2))! ||
        Number((Math.floor(tax! * 100) / 100).toFixed(2))!
      : 0;
  const tip = tipPercent
    ? Number(
        (
          Math.floor(((totalBill * Number(tipPercent!)) / 100) * 100) / 100
        ).toFixed(2)
      )
    : 0;

  let costPerPerson = "$0";

  if (split === "even") {
    costPerPerson = "$" + Number(((totalBill + tip!) / numPeople!).toFixed(2));
  } else {
    costPerPerson = "Meal + $" + Number(((tip + tax!) / numPeople!).toFixed(2));
  }
  console.log(typeof costPerPerson, costPerPerson);
  return (
    <div className="mx-4">
      <div className="flex justify-around mb-8">
        <div className="flex flex-col items-center">
          <p className="text-black">Total Bill</p>
          <p className="text-black text-3xl">${totalBill}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-black">Total Tip</p>
          <p className="text-black text-3xl">${tip || 0}</p>
        </div>
      </div>
      <div className="flex flex-col items-center rounded-md border-4 border-t-black border-slate-100 bg-slate-100 drop-shadow-lg">
        <p className="font-bold text-red-700">Total Cost Per Person</p>
        <p className="text-3xl font-bold text-red-700 ">
          {costPerPerson.includes("$Infinity") ||
          costPerPerson.includes("$NaN") ||
          costPerPerson.includes("$undefined")
            ? "$0"
            : costPerPerson}
        </p>
      </div>
    </div>
  );
}
