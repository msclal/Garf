import React, { useState } from "react";
import BillForm from "@/components/BillForm";
import BillCalculate from "@/components/BillCalculate";

export default function Bill() {
  const [state, setState] = useState({
    split: "",
    bill: undefined,
    tax: undefined,
    tipPercent: undefined,
    numPeople: undefined,
  });

  console.log(
    state.split,
    state.bill,
    state.tax,
    state.tipPercent,
    state.numPeople
  );

  const onUpdateState = (newState: object) => {
    setState({
      ...state,
      ...newState,
    });
  };
  return (
    <div>
      <BillForm state={state} onUpdateState={onUpdateState} />
      <BillCalculate state={state} />
    </div>
  );
}
