import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Recipe = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const navigate = useNavigate(); // For navigation
  const [recipe, setRecipe] = useState(null); // State to store recipe details
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch recipe details from the API
    axios
      .get(`http://localhost:5050/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch recipe details.");
      });
  }, [id]);

  // Add this function inside the Recipe component
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await axios.delete(`http://localhost:5050/api/recipes/${id}`);
        navigate("/recipe-book"); // Redirect to home or recipes list after deletion
      } catch (err) {
        setError("Failed to delete recipe.");
      }
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="center mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <div className="mb-6">
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
        <p>
          <strong>Meal Type:</strong> {recipe.mealType}
        </p>
        <p>
          <strong>Prep Time:</strong> {recipe.prepTime} minutes
        </p>
        <p>
          <strong>Cook Time:</strong> {recipe.cookTime} minutes
        </p>
        <p>
          <strong>Total Time:</strong> {recipe.totalTime} minutes
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b pb-2">
          Ingredients
        </h2>
        <ul className="list-disc pl-6">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 border-b pb-2">Steps</h2>
        <ol className="list-decimal pl-6">
          {recipe.steps.map((step, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Edit Recipe Button */}
      <button
        onClick={() => navigate(`/edit-recipe/${id}`)}
        className="bg-[#CECEFB] border px-4 py-2 rounded mt-4 mr-2"
      >
        Edit Recipe
      </button>
      {/* Delete Recipe Button */}
      <button
        onClick={handleDelete}
        className="bg-[#CECEFB] border px-4 py-2 rounded mt-4"
      >
        Delete Recipe
      </button>
    </div>
  );
};

export default Recipe;
