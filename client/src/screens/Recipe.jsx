import { Button } from "flowbite-react";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Recipe = () => {
  const {
    _id,
    recipeName,
    description,
    servings,
    ingredients,
    directions,
    prepTime,
    cookTime,
    notes,
    tags,
  } = useLoaderData();

  return (
    <div className="m-8">
      <div className="absolute right-0 mx-4">
        <Link to={`/edit-recipe/${_id}`}>
          <Button>Edit</Button>
        </Link>
      </div>
      <div>
        <div className="text-xl">{recipeName}</div>
        <div>{description}</div>
        <div className="p-4">Servings: {servings}</div>
        <div className="">
          {ingredients.map((ingr, index) => (
            <div key={`ingr${index}`}>
              {index + 1}. {ingr.quantity} {ingr.ingredient}
            </div>
          ))}
          <div className="pt-5"></div>
          {directions.map((dir, index) => (
            <div key={`dir${index}`}>
              Step {index + 1}. {dir.direction}
            </div>
          ))}
        </div>

        <div className="m-5 flex flex-row">
          <div className="mx-8">Prep Time: {prepTime}</div>
          <div>Cook Time: {cookTime}</div>
        </div>

        <div>{notes}</div>

        <div className="flex flex-row">
          {tags.map((tag, index) => (
            <div className="p-2" key={`tag${index}`}>
              #{tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
