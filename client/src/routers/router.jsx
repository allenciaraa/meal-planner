import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screens/Home";
import AddNewMeal from "../screens/AddNewMeal";
import RecipeBook from "../screens/RecipeBook";
import Recipe from "../screens/Recipe";
import SharedRecipes from "../screens/SharedRecipes";
import EditRecipe from "../screens/EditRecipe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add-meal",
        element: <AddNewMeal />,
      },
      {
        path: "/recipe-book",
        element: <RecipeBook />,
      },
      {
        path: "/explore",
        element: <SharedRecipes />,
      },
      {
        path: "/recipe/:id",
        element: <Recipe />,
        loader: ({ params }) =>
          fetch(`http://localhost:3005/recipe/${params.id}`),
      },
      {
        path: "/edit-recipe/:id",
        element: <EditRecipe />,
        loader: ({ params }) =>
          fetch(`http://localhost:3005/recipe/${params.id}`),
      },
    ],
  },
]);

export default router;
