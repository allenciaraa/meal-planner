import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const categories = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const RecipeBook = () => {
  const [recipes, setRecipes] = useState([]);
  const [openSections, setOpenSections] = useState({});

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

  const toggleSection = (category) => {
    setOpenSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupRecipesByMealType = (type) =>
    recipes.filter((recipe) => recipe.mealType === type);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipe Book</h1>

      {categories.map((category) => (
        <div key={category} className="mb-4 border rounded shadow">
          <button
            onClick={() => toggleSection(category)}
            className="w-full text-left p-4 bg-[#CECEFB] text-xl font-semibold rounded-t"
          >
            {category}
          </button>
          {openSections[category] && (
            <div className="p-4 bg-white space-y-3">
              {groupRecipesByMealType(category).length > 0 ? (
                groupRecipesByMealType(category).map((recipe) => (
                  <Link to={`/recipe/${recipe._id}`}>
                    <div
                      key={recipe._id}
                      className="p-3 border rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
                    >
                      <h3 className="text-lg font-bold">{recipe.name}</h3>
                      <p className="text-sm text-gray-600">
                        Servings: {recipe.servings} • Total Time:{" "}
                        {recipe.totalTime} min
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Ingredients: {recipe.ingredients.join(", ")}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No recipes available.</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add Recipe Button */}
      <div className="mt-8 text-center">
        <Link to="/add-recipe">
          <button className="bg-[#CECEFB] hover:bg-[#B5B5F5] font-semibold border px-6 py-2 rounded shadow">
            + Add Recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeBook;
