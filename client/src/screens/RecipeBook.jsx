import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const RecipeBook = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/all-recipes")
      .then((res) => res.json())
      .then((data) => setAllRecipes(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3005/recipe/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Book has been deleted successfully");
      });
  };

  return (
    <div className="p-4 my-12">
      <div>RecipeBook</div>
      {allRecipes.map((recipe, index) => (
        <div className="flex flex-row p-2">
          <Link key={`recipe${index}`} to={`/recipe/${recipe._id}`}>
            <div className="m-1">{recipe.recipeName}</div>
          </Link>
          <Button pill size="xs" onClick={() => handleDelete(recipe._id)}>
            delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default RecipeBook;
