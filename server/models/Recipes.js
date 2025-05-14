const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    servings: { type: Number, required: true },
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snacks"],
      required: true,
    },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    totalTime: { type: Number, required: true },
    ingredients: [String],
    steps: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
