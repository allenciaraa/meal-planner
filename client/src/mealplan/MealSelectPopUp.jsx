import React from "react";
import { Button, Checkbox, Label, Modal, Select, TextInput} from "flowbite-react";
import { useEffect, useState } from "react";

const MealSelectPopUp = ({ name }) => {
  const [openModal, setOpenModal] = useState(true);

  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/all-recipes")
      .then((res) => res.json())
      .then((data) => setAllRecipes(data));
  }, []);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header>{name}</Modal.Header>
        <Modal.Body>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="recipeSelect" value="Select a meal" />
            </div>
            <Select id="recipeSelect" required>
              {allRecipes.map((recipe) => (
                <option>{recipe.recipeName}</option>
              ))}
            </Select>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MealSelectPopUp;
