import React from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
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
          <div className="space-y-6">
            {allRecipes.map((recipe) => (
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {recipe.recipeName}
              </p>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MealSelectPopUp;
