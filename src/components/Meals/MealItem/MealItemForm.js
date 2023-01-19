import React, { useContext, useRef, useState } from "react";

import Input from "../../UI/Input";
import CartContext from "../../../store/cart-context";

import classes from "./MealItemForm.module.css";

export default function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const cartCtx = useContext(CartContext);
  const amountInputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //with "+" tranforming stringvalue into number.
    const enteredAmount = +amountInputRef.current.value;


    if (
      amountInputRef.current.value.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    } else {
      setAmountIsValid(true);
    }

    const meal = { ...props.meal, amount: enteredAmount };

    cartCtx.addItem(meal);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
        label="Amount"
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount.</p>}
    </form>
  );
}
