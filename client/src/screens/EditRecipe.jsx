import { Label, Textarea, Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const EditRecipe = () => {
  const [ingredientFields, setIngredientFields] = useState([]);

  const { id } = useParams();

  const {
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

  console.log(ingredients);

  const handleIngredientChange = (event, index) => {
    let data = [...ingredientFields];
    data[index][event.target.name] = event.target.value;
    setIngredientFields(data);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const recipeName = form.recipeName.value;
    const description = form.description.value;
    const servings = form.servings.value;
    // const ingredients;
    // const directions;
    const prepTime = form.prepTime.value;
    const cookTime = form.cookTime.value;
    const notes = form.notes.value;
    // const tags;
  };

  return (
    <div className="pt-9">
      <form onSubmit={handleUpdate}>
        {/* Recipe Name */}
        <div className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="recipeName"
                value="Recipe Name"
              />
            </div>
            <TextInput
              id="recipeName"
              type="text"
              placeholder="Recipe name"
              defaultValue={recipeName}
              sizing="md"
            />
          </div>
        </div>
        {/* Description */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label
              className="text-white"
              htmlFor="description"
              value="Description"
            />
          </div>
          <Textarea
            id="description"
            defaultValue={description}
            placeholder="Describe your recipe..."
            rows={4}
          />
        </div>
        {/* Servings */}
        <div>
          <div className="mb-2 block">
            <Label className="text-white" htmlFor="servings" value="Servings" />
            <TextInput
              className="w-1/5"
              defaultValue={servings}
              id="servings"
              type="number"
              min="0"
              sizing="sm"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <div>Ingredients</div>
        </div>
        {ingredients.map((ingr, index) => {
          return (
            <div className="flex" key={`ingrRow${index}`}>
              <TextInput
                defaultValue={ingr.quantity}
                className="w-1/4 mx-1 my-2"
                name="quantity"
                id="quantity"
                placeholder="Quantity"
              />
              <TextInput
                className="w-1/2 m-2"
                name="ingredient"
                placeholder="Ingredient name"
                defaultValue={ingr.ingredient}
              />
              <Button className="w-1/8 m-2" type="button">
                x
              </Button>
            </div>
          );
        })}

        {/* Time */}
        <div className="flex max-w-md flex-row gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="prepTime"
                value="Prep Time"
              />
            </div>
            <TextInput id="prepTime" type="text" sizing="sm" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-white"
                htmlFor="cookTime"
                value="Cook Time"
              />
            </div>
            <TextInput id="cookTime" type="text" sizing="sm" />
          </div>
        </div>
        {/* Notes */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label className="text-white" htmlFor="notes" value="Notes" />
          </div>
          <Textarea
            id="notes"
            placeholder="Write anything you might need to know about this..."
            rows={4}
          />
        </div>
        {/* Tags */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label className="text-white" htmlFor="tags" value="Tags" />
          </div>
          <Textarea
            id="tags"
            placeholder="Separate tags by a comma..."
            rows={4}
          />
        </div>
        {/* Add sides */}
        {}
        {/* <Button type="button" onClick={addSides}>
          Add a Side
        </Button> */}
        {/* Submit */}
        <div className="pt-3">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
