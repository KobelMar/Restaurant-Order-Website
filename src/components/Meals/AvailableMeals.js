import React, { useEffect, useState } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

import classes from "./AvailableMeals.module.css";

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodorderapp-5c9f8-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const fetchedMeals = [];

      for (let key in data) {
        const meal = {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
        fetchedMeals.push(meal);
      }

      setMeals(fetchedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <Card individualClass={classes.MealsLoading}>
        <p>is Loading...</p>
      </Card>
    );
  }

  if (httpError) {
    return (
      <Card individualClass={classes.httpError}>
        <p>Error</p>
      </Card>
    );
  }

  const mealsList = meals.map((meal) => {
    return <MealItem meal={meal} key={meal.id} />;
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}
