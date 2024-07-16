import React, { useState } from "react";
import { Label, Checkbox, TextInput, Textarea, Button } from "flowbite-react";

const AddNewMeal = () => {
  const [ingredientFields, setIngredientFields] = useState([
    { quantity: "", ingredient: "" },
  ]);

  const [directionFields, setDirectionFields] = useState([{ direction: "" }]);

  const handleIngredientChange = (event, index) => {
    let data = [...ingredientFields];
    data[index][event.target.name] = event.target.value;
    setIngredientFields(data);
  };

  const handleDirectionChange = (event, index) => {
    let data = [...directionFields];
    data[index][event.target.name] = event.target.value;
    setDirectionFields(data);
  };

  const addIngredientField = () => {
    let object = {
      quantity: "",
      ingredient: "",
    };

    setIngredientFields([...ingredientFields, object]);
  };

  const addIngredientSubstitution = (index) => {
    console.log(index);
  };

  const addDirectionField = () => {
    let object = {
      direction: "",
    };

    setDirectionFields([...directionFields, object]);
  };

  const addSides = () => {
    console.log("side");
  };

  const removeIngredientField = (index) => {
    let data = [...ingredientFields];
    data.splice(index, 1);
    setIngredientFields(data);
  };

  const removeDirectionField = (index) => {
    let data = [...directionFields];
    data.splice(index, 1);
    setDirectionFields(data);
  };

  const handleRecipeSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const recipeName = form.recipeName.value;
    const description = form.description.value;
    const servings = form.servings.value;
    const ingredients = ingredientFields;
    const directions = directionFields;
    const prepTime = form.prepTime.value;
    const cookTime = form.cookTime.value;
    const notes = form.notes.value;
    const tags = form.tags.value.split(",");

    const recipeObj = {
      recipeName,
      description,
      servings,
      ingredients,
      directions,
      prepTime,
      cookTime,
      notes,
      tags,
    };

    console.log(recipeObj);

    fetch("http://localhost:3005/upload-recipe", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(recipeObj),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Recipe uploaded successfully!");
        form.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="pt-9">
      <form onSubmit={handleRecipeSubmit}>
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
            <TextInput id="recipeName" type="text" sizing="md" />
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
            placeholder="Describe your recipe..."
            rows={4}
          />
        </div>

        {/* Servings */}
        <div>
          <div className="mb-2 block">
            <Label className="text-white" htmlFor="servings" value="Servings" />
          </div>
          <TextInput id="servings" type="number" min="0" sizing="sm" />
        </div>

        {/* Ingredients */}
        <div>
          <div>Ingredients</div>
          <div>
            {ingredientFields.map((form, index) => {
              return (
                <div className="flex" key={`ingrRow${index}`}>
                  <TextInput
                    className="w-1/5"
                    name="quantity"
                    id="quantity"
                    placeholder="Quantity"
                    onChange={(event) => handleIngredientChange(event, index)}
                    value={form.quantity}
                  />
                  <TextInput
                    className="w-1/2"
                    name="ingredient"
                    placeholder="Ingredient Name"
                    onChange={(event) => handleIngredientChange(event, index)}
                    value={form.ingredient}
                  />
                  <Button
                    className="w-1/8"
                    type="button"
                    onClick={() => removeIngredientField(index)}
                  >
                    x
                  </Button>
                  {/* <Button
                  className="w-1/8"
                  type="button"
                  onClick={() => addIngredientSubstitution(index)}
                >
                  Sub
                </Button> */}
                </div>
              );
            })}
          </div>
        </div>
        <Button type="button" onClick={addIngredientField}>
          +
        </Button>

        {/* Directions */}
        <div>
          <div>Directions</div>
        </div>

        {directionFields.map((form, index) => {
          return (
            <div className="flex" key={`dirRow${index}`}>
              <div className="p-3">Step {index + 1}: </div>
              <TextInput
                className="w-2/3"
                name="direction"
                id="direction"
                placeholder="Steps..."
                onChange={(event) => handleDirectionChange(event, index)}
              />
              <Button
                className="w-1/8"
                type="button"
                onClick={() => removeDirectionField(index)}
              >
                x
              </Button>
            </div>
          );
        })}
        <Button type="button" onClick={addDirectionField}>
          +
        </Button>

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
        <Button type="button" onClick={addSides}>
          Add a Side
        </Button>

        {/* Submit */}
        <div className="pt-3">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMeal;
