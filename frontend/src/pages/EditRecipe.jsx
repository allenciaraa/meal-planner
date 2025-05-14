import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    servings: "",
    mealType: "Breakfast",
    prepTime: "",
    cookTime: "",
    totalTime: 0,
    ingredients: [""],
    steps: [""],
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe.");
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...recipe[field]];
    updatedArray[index] = e.target.value;
    setRecipe({ ...recipe, [field]: updatedArray });
  };

  const addField = (field) => {
    setRecipe({ ...recipe, [field]: [...recipe[field], ""] });
  };

  const removeField = (field, index) => {
    const updatedArray = recipe[field].filter((_, i) => i !== index);
    setRecipe({ ...recipe, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !recipe.name ||
      !recipe.servings ||
      !recipe.prepTime ||
      !recipe.cookTime
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const updatedRecipe = {
      ...recipe,
      totalTime: parseInt(recipe.prepTime) + parseInt(recipe.cookTime),
    };

    try {
      await axios.put(`http://localhost:5050/api/recipes/${id}`, updatedRecipe);
      navigate(`/recipe-book`);
    } catch (err) {
      console.error(err);
      setError("Failed to update recipe.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Recipe Name"
          className="input"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <input
          name="servings"
          type="number"
          placeholder="Servings"
          className="input"
          value={recipe.servings}
          onChange={handleChange}
          required
        />
        <select
          name="mealType"
          className="input"
          value={recipe.mealType}
          onChange={handleChange}
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
        </select>
        <input
          name="prepTime"
          type="number"
          placeholder="Prep Time (min)"
          className="input"
          value={recipe.prepTime}
          onChange={handleChange}
          required
        />
        <input
          name="cookTime"
          type="number"
          placeholder="Cook Time (min)"
          className="input"
          value={recipe.cookTime}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block font-semibold">Ingredients</label>
          {recipe.ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                value={ing}
                onChange={(e) => handleArrayChange(e, idx, "ingredients")}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => removeField("ingredients", idx)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("ingredients")}
            className="text-blue-600"
          >
            + Add Ingredient
          </button>
        </div>

        <div>
          <label className="block font-semibold">Steps</label>
          {recipe.steps.map((step, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                value={step}
                onChange={(e) => handleArrayChange(e, idx, "steps")}
                className="input flex-1"
              />
              <button
                type="button"
                onClick={() => removeField("steps", idx)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("steps")}
            className="text-blue-600"
          >
            + Add Step
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#CECEFB] border hover:bg-[#B5B5F5] px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
