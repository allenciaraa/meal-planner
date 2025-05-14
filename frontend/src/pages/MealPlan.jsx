import React, { useState, useEffect } from "react";
import axios from "axios";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const MealPlan = () => {
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState(() => {
    const initial = {};
    meals.forEach((meal) => {
      initial[meal] = Array(7).fill(null);
    });
    return initial;
  });

  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  const handleCellClick = (meal, dayIndex) => {
    setSelectedCell({ meal, dayIndex });
    setSelectedRecipeId("");
  };

  const handleSave = () => {
    if (!selectedCell || !selectedRecipeId) return;
    const recipe = recipes.find((r) => r._id === selectedRecipeId);
    const newPlan = { ...mealPlan };
    newPlan[selectedCell.meal][selectedCell.dayIndex] = recipe;
    setMealPlan(newPlan);
    setSelectedCell(null);
  };

  const handleGenerateGroceryList = () => {
    const ingredients = {};

    meals.forEach((meal) => {
      mealPlan[meal].forEach((recipe) => {
        if (recipe) {
          recipe.ingredients.forEach((ingredient) => {
            if (ingredients[ingredient]) {
              ingredients[ingredient] += 1;
            } else {
              ingredients[ingredient] = 1;
            }
          });
        }
      });
    });

    const groceryListArray = Object.entries(ingredients).map(
      ([ingredient, count]) => `${ingredient} x${count}`
    );
    setGroceryList(groceryListArray);
  };

  const filteredRecipes = selectedCell
    ? recipes.filter((r) => r.mealType === selectedCell.meal)
    : [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold m-4 text-center">Meal Planner</h2>

      <div
        className="grid gap-4 -ml-30"
        style={{ gridTemplateColumns: `120px repeat(7, 1fr)` }}
      >
        <div className="font-semibold text-center"></div>
        {days.map((day, idx) => (
          <div key={idx} className="font-semibold text-center text-gray-700">
            {day}
          </div>
        ))}

        {meals.map((meal) => (
          <React.Fragment key={meal}>
            <div className="font-semibold p-0 -mr-20 writing-vertical-rl rotate-270 text-gray-700 flex items-center justify-center">
              {meal}
            </div>
            {Array.from({ length: 7 }, (_, dayIdx) => {
              const cell = mealPlan[meal][dayIdx];
              return (
                <div
                  key={dayIdx}
                  className={`h-32 w-32 flex items-center align-middle content-center justify-center rounded-lg cursor-pointer transition ${
                    cell
                      ? "bg-[#CECEFB] hover:bg-[#B5B5F5] font-medium text-center drop-shadow-xl"
                      : "bg-white hover:bg-gray-100 border"
                  }`}
                  onClick={() => handleCellClick(meal, dayIdx)}
                >
                  {cell ? cell.name : ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleGenerateGroceryList}
          className="bg-[#CECEFB] hover:bg-[#B5B5F5] font-semibold border px-6 py-2 rounded shadow"
        >
          Save Grocery List
        </button>
      </div>

      {groceryList.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">Grocery List</h3>
          <ul className="list-disc pl-6">
            {groceryList.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCell && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h3 className="text-xl font-semibold mb-4">
              Choose {selectedCell.meal} Recipe for{" "}
              {days[selectedCell.dayIndex]}
            </h3>

            <select
              value={selectedRecipeId}
              onChange={(e) => setSelectedRecipeId(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">-- Select a recipe --</option>
              {filteredRecipes.map((recipe) => (
                <option key={recipe._id} value={recipe._id}>
                  {recipe.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setSelectedCell(null)}
              >
                Cancel
              </button>
              <button
                className="bg-[#CECEFB] hover:bg-[#B5B5F5] font-semibold border px-6 py-2 rounded shadow"
                onClick={handleSave}
                disabled={!selectedRecipeId}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlan;
