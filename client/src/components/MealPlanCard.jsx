import { React, useState } from "react";
import { Button } from "flowbite-react";
import MealSelectPopUp from "../mealplan/MealSelectPopUp";

const MealPlanCard = ({ name }) => {
  const [openMealSelect, setOpenMealSelect] = useState(false);

  const handleClick = () => {
    setOpenMealSelect(!openMealSelect);
    console.log({ name });
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        color="dark"
        className={
          "border-dashed border-2 border-violet-400 p-10 m-2 rounded-lg"
        }
      >
        {name}
      </Button>
      {openMealSelect ? <MealSelectPopUp name={name} /> : <div>nope</div>}
    </div>
  );
};

export default MealPlanCard;
