import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import MealPlan from "./pages/MealPlan";
import Recipe from "./pages/Recipe";
import RecipeBook from "./pages/RecipeBook";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/recipe-book" element={<RecipeBook />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
