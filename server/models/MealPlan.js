const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
  {
    weekOf: { type: Date, required: true },
    plan: {
      Breakfast: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", default: null },
      ],
      Lunch: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", default: null },
      ],
      Dinner: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", default: null },
      ],
      Snacks: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Recipe", default: null },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);
