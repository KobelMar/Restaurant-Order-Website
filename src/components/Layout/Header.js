import React from "react";

import HeaderCartButton from "../UI/HeaderCartButton";

import mealsImage from "../../assets/meals.jpg";

import classes from "./Header.module.css";

export default function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Table full of good food." />
      </div>
    </React.Fragment>
  );
}
