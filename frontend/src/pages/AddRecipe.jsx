import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [form, setForm] = useState({
    name: "",
    servings: "",
    mealType: "",
    prepTime: "",
    cookTime: "",
    totalTime: 0,
    ingredients: [""],
    steps: [""],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === "prepTime" || name === "cookTime") {
      const prep = parseInt(name === "prepTime" ? value : form.prepTime) || 0;
      const cook = parseInt(name === "cookTime" ? value : form.cookTime) || 0;
      updatedForm.totalTime = prep + cook;
    }

    setForm(updatedForm);
  };

  const handleArrayChange = (e, index, field) => {
    const updated = [...form[field]];
    updated[index] = e.target.value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const validateForm = () => {
    const required = ["name", "servings", "mealType", "prepTime", "cookTime"];
    for (let field of required) {
      if (!form[field]) {
        alert(`Please fill out ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...form,
        servings: parseInt(form.servings),
        prepTime: parseInt(form.prepTime),
        cookTime: parseInt(form.cookTime),
        totalTime: form.totalTime,
      };

      await axios.post("http://localhost:5050/api/recipes", payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      alert("✅ Recipe added successfully!");
      navigate("/recipe-book");
    } catch (err) {
      console.error("❌ Error adding recipe:", err);
      alert("Error: Could not save recipe. Check console for details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <input
          name="name"
          placeholder="Recipe Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="servings"
          type="number"
          placeholder="Servings"
          value={form.servings}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="mealType"
          value={form.mealType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
        </select>

        {/* Time Inputs */}
        <div className="grid grid-cols-3 gap-4">
          <input
            name="prepTime"
            type="number"
            placeholder="Prep Time (min)"
            value={form.prepTime}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="cookTime"
            type="number"
            placeholder="Cook Time (min)"
            value={form.cookTime}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="totalTime"
            type="number"
            placeholder="Total Time"
            value={form.totalTime}
            readOnly
            className="p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="font-semibold">Ingredients</label>
          {form.ingredients.map((ing, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ing}
                onChange={(e) => handleArrayChange(e, idx, "ingredients")}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayField("ingredients", idx)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("ingredients")}
            className="text-sm text-blue-600"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Steps */}
        <div>
          <label className="font-semibold">Steps</label>
          {form.steps.map((step, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={step}
                onChange={(e) => handleArrayChange(e, idx, "steps")}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayField("steps", idx)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("steps")}
            className="text-sm text-blue-600"
          >
            + Add Step
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#CECEFB] hover:bg-[#B5B5F5] px-4 py-2 rounded border"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
