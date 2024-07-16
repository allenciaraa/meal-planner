import React, { useState } from "react";

const MealsRow = ({ numMeals }) => {
  const [mealFields, setMealFields] = useState([{ name: "", id: "" }]);

  return (
    <div>
      <div>Meals: </div>
      <div>{numMeals}</div>
    </div>
  );
};

export default MealsRow;
