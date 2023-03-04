import React from "react";

interface Props {
  state: {
    split?: string | null;
    bill?: number | null;
    tax?: number | null;
    tipPercent?: number | null;
    numPeople?: number | null;
  };
}

export default function BillForm({ state }: Props) {
  const { split, bill, tax, tipPercent, numPeople } = state;
  console.log("bill", bill, typeof Number(bill));
  console.log("tax", tax, typeof tax);
  console.log("tipPercent", tipPercent, typeof Number(tipPercent));
  const totalBill =
    bill && tax
      ? Number(
          (Math.round((Number(bill!) + Number(tax!)) * 100) / 100).toFixed(2)
        )
      : bill || tax
      ? Number((Math.round(bill! * 100) / 100).toFixed(2))! ||
        Number((Math.round(tax! * 100) / 100).toFixed(2))!
      : 0;
  const tip = tipPercent
    ? Number(
        (Math.round(((totalBill * tipPercent!) / 100) * 100) / 100).toFixed(2)
      )
    : 0;
  console.log("totalBill", totalBill, typeof Number(totalBill));
  console.log("tipPercent", tipPercent, typeof Number(tipPercent));

  let costPerPerson = "$0";

  if (split === "even") {
    const num = Number(((totalBill + tip!) / numPeople!).toFixed(2));
    costPerPerson =
      num === 0 ? `One pays for all $${totalBill + tip}` : `$${num}`;
  } else {
    console.log(tip, typeof tip, tax, typeof tax, numPeople, typeof numPeople),
      (costPerPerson =
        "Meal + $" + Number(((tip + Number(tax!)) / numPeople!).toFixed(2)));
  }
  console.log("costPerPerson", costPerPerson, typeof costPerPerson);
  return (
    <div className="mx-4">
      <div className="flex justify-around mb-8">
        <div className="flex flex-col items-center">
          <p className="text-black">Total Bill</p>
          <p className="text-black text-3xl">${totalBill}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-black">Total Tip</p>
          <p className="text-black text-3xl">${tip}</p>
        </div>
      </div>
      <div className="flex flex-col items-center rounded-md border-4 border-t-black border-slate-100 bg-slate-100 drop-shadow-lg">
        <p className="font-bold text-red-700">Total Cost Per Person</p>
        <p className="text-3xl font-bold text-red-700 ">
          {costPerPerson.includes("Infinity") ||
          costPerPerson.includes("NaN") ||
          costPerPerson.includes("undefined") ||
          costPerPerson.includes("null")
            ? "$0"
            : costPerPerson}
        </p>
      </div>
    </div>
  );
}
