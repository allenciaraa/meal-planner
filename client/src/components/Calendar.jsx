import React, { useState } from "react";
import MealPlanCard from "./MealPlanCard";
import MealSelectPopUp from "../mealplan/MealSelectPopUp";

const breakfasts = [
  "test 0",
  "test 1",
  "test 2",
  "test 3",
  "test 4",
  "test 5",
  "test 6",
];

const Calendar = () => {
  return (
    <div className="pt-4">
      <MealSelectPopUp />
      <div className="grid grid-cols-7">
        {breakfasts.map((bf, idx) => {
          return <MealPlanCard name={bf} />;
        })}
      </div>

      {/* <div className="grid grid-cols-7">
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
      </div>
      <div className="grid grid-cols-7">
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
      </div>
      <div className="grid grid-cols-7">
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
        <MealPlanCard />
      </div> */}
    </div>
  );
};

export default Calendar;
