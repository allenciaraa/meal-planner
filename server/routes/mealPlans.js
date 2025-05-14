const express = require("express");
const MealPlan = require("../models/MealPlan");
const router = express.Router();

router.get("/", async (req, res) => {
  const plans = await MealPlan.find().populate(
    "plan.Breakfast plan.Lunch plan.Dinner plan.Snacks"
  );
  res.json(plans);
});

router.post("/", async (req, res) => {
  const mealPlan = new MealPlan(req.body);
  await mealPlan.save();
  res.status(201).json(mealPlan);
});

module.exports = router;
