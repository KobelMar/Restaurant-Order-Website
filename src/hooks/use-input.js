import React, { useState } from "react";

export default function useInput(validate) {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredTextIsValid = validate(inputValue);
  const hasError = isTouched && !enteredTextIsValid;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue("");
    setIsTouched(false);
  };

  return {
    inputValue,
    enteredTextIsValid,

    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
}
