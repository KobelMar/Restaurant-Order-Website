import React from "react";

import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

export default function Checkout(props) {
  const {
    inputValue: name,
    enteredTextIsValid: nameTextIsValid,

    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    inputValue: street,
    enteredTextIsValid: streetTextIsValid,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    inputValue: postal,
    enteredTextIsValid: postalTextIsValid,
    hasError: postalHasError,
    inputChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(isFiveChars);

  const {
    inputValue: city,
    enteredTextIsValid: cityTextIsValid,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const confirmHandler = (event) => {
    event.preventDefault();

    const userData = {name, street, postal, city}
    props.onSubmit(userData)


    resetName();
    resetCity();
    resetPostal();
    resetStreet();
  };

  let formIsValid = false;

  if (
    nameTextIsValid &&
    streetTextIsValid &&
    postalTextIsValid &&
    cityTextIsValid
  ) {
    formIsValid = true;
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.input_div_control}>
        <div
          className={`${classes.control} ${
            nameHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p>Please enter a valid name</p>}
        </div>

        <div
          className={`${classes.control} ${
            streetHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
          />
          {streetHasError && <p>Please enter a valid street.</p>}
        </div>

        <div
          className={`${classes.control} ${
            postalHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            value={postal}
            onChange={postalChangeHandler}
            onBlur={postalBlurHandler}
          />
          {postalHasError && <p>Please enter a valid Postal code.</p>}
        </div>
        <div
          className={`${classes.control} ${
            cityHasError ? classes.invalid : ""
          }`}
        >
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
          />
          {cityHasError && <p>Please enter a valid city.</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
}
