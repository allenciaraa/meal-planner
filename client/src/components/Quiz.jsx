import { Label, TextInput, Button } from "flowbite-react";
import React, { useState } from "react";
import MealsRow from "./MealsRow";

const Quiz = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numMeals, setNumMeals] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const numMeals = form.numMeals.value;

    setNumMeals(numMeals);
    setIsSubmitted(true);
  };

  return (
    <div>
      {!isSubmitted ? (
        <div className="flex max-w-md flex-col gap-4 content-center">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label
                  className="text-white"
                  htmlFor="numMeals"
                  value="How many meals do you want?"
                />
              </div>
              <TextInput id="numMeals" type="number" min="0" sizing="sm" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="submit"
                className="mt-5"
                outline
                gradientDuoTone="purpleToBlue"
              >
                Go
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div>thank u chef</div>
          <MealsRow numMeals={numMeals} />
        </div>
      )}
    </div>
  );
};

export default Quiz;
