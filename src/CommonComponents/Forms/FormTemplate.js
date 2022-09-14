import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  createCard,
  createDeck,
  listDecks,
  updateCard,
  updateDeck,
} from "../../utils/api";
import FormField from "./FormField";

function FormTemplate({
  objToModify,
  objType,
  modifyType,
  deckName,
  decks,
  setDecks,
}) {
  //For the event handlers to navigate
  const history = useHistory();
  const {
    url,
    params: { deckId },
  } = useRouteMatch();

  //deckView is always the first three segments of the url
  const deckViewURL = url.split("/").slice(0, 3).join("/");

  //Only add the Deck Name to the heading if the component is given a deckName prop
  const deckHeading = deckName ? `${deckName}: ` : null;

  //"Done" when adding, but "Cancel" when editing
  const cancelType = modifyType === "Add" ? "Cancel" : "Cancel";
  //"Save" when adding, but "Submit" when editing
  const submitType = modifyType === "Add" ? "Save" : "Submit";

  //Deck and Card have unique placeholders for each form
  const firstPlaceholder =
    objType === "Deck" ? "Deck Name" : "Front side of card";
  const secondPlaceholder =
    objType === "Deck" ? "Brief description of the deck" : "Back side of card";

  //Default state is empty when adding, but is the current data when editing.
  const defaultFormState =
    modifyType === "Add"
      ? //When Adding...
        objType === "Deck"
        ? { name: "", description: "" } //Add Empty Deck for Deck
        : { front: "", back: "" } //Add Empty Card for Card
      : //When Editing...
      objType === "Deck"
      ? { name: objToModify.name, description: objToModify.description } //Deck name & Description for Deck
      : { front: objToModify.front, back: objToModify.back }; //Card front & back for Card

  //State control Object that holds key value pair corresponding to each forms input variables
  const [formData, setFormData] = useState(defaultFormState);

  //Changes the formData Object to be a copy of the existing object, but overrides the name key to be the value user inputted
  const formChangeHandler = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /************************************************************
   * * * * * * * * * * CANCEL EVENT HANDLER * * * * * * * * * *
   ************************************************************
   * Adding new Deck goes Home
   *
   * Editing old Deck goes to DeckView
   * Adding new card goes to DeckView
   * Editing old card goes to DeckView
   */
  const cancelHandler = () => {
    setFormData(defaultFormState);
    if (objType === "Deck" && modifyType === "Add") history.push("");
    else history.push(deckViewURL);
  };

  /*********************************************************************
   * * * * * * * * * * SUBMIT EVENT HANDLER VARIANTS * * * * * * * * * *
   *********************************************************************

  /***************************
   * * * * * EDITING * * * * *
   ***************************/
  //If editing, we need to make the updateXXX utility API call.
  const editSubmitHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    //objType determines if we are editing a Deck or a Card
    objType === "Deck" ? editDeck(controller) : editCard(controller);
  };

  //Editing Deck requires name and description key, as well as the updateDeck utility API call
  function editDeck({ signal }) {
    const newDeck = {
      ...objToModify,
      name: formData.name,
      description: formData.description,
    };
    updateDeck(newDeck, signal).then(() => updateDecks(signal));
  }

  //Editing Card requires front and back key, as well as the updateCard utility API call
  function editCard({ signal }) {
    const newCard = {
      ...objToModify,
      front: formData.front,
      back: formData.back,
    };
    updateCard(newCard, signal).then(() => updateDecks(signal));
  }

  /***************************
   * * * * * ADDING * * * * *
   ***************************/
  //If adding, we need to make the createXXX utility API call.
  const addSubmitHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    //objType determines if we are adding a Deck or a Card
    objType === "Deck" ? addDeck(controller) : addCard(controller);
  };

  //Adding Deck requires name and description key, as well as the createDeck utility API call
  function addDeck({ signal }) {
    const newDeck = { name: formData.name, description: formData.description };
    createDeck(newDeck, signal).then(() => updateDecks(signal));
  }

  //Adding Card requires front and back key, as well as the createDeck utility API call
  function addCard({ signal }) {
    const newCard = {
      front: formData.front,
      back: formData.back,
    };
    createCard(deckId, newCard, signal).then(() => updateDecks(signal));
  }

  /**********************************************************
   * * * * * * * * * * UPDATE DECKS STATE * * * * * * * * * *
   **********************************************************
  /**
   * This function is called in every submit handler.
   * Any time we modify an object,
   * we need to modify the root decks state variable;
   * This ensures everything gets re-rendered after requests
   * */
  function updateDecks(signal) {
    listDecks(signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name !== "AbortError") throw error;
      })
      .then(() => {
        //Reset the forms
        setFormData(defaultFormState);

        //Adding new card goes nowhere
        if (objType === "Card" && modifyType === "Add") return null;

        //All other formTypes send the user to deckView
        if (!deckId)
          //if there is no deckId param, it's because we are adding a deck: {BASE_UR:}/decks/new
          //so we can just grab the id of the last deck in decks in the place of the deckId param
          history.push(
            deckViewURL
              .split("/")
              .slice(0, 2)
              .join("/")
              .concat(`/${decks[decks.length - 1].id + 1}`)
          );
        else history.push(deckViewURL);
      });
  }

  return (
    <>
      <h1 className="h1">
        {deckHeading}
        {modifyType} {objType}
      </h1>
      <form
        onSubmit={modifyType === "Add" ? addSubmitHandler : editSubmitHandler}
      >
        <FormField
          inputType={objType === "Deck" ? "text" : "textarea"}
          name={objType === "Deck" ? "name" : "front"}
          placeholder={firstPlaceholder}
          value={objType === "Deck" ? formData.name : formData.front}
          formChangeHandler={formChangeHandler}
        />
        <FormField
          inputType="textarea"
          name={objType === "Deck" ? "description" : "back"}
          placeholder={secondPlaceholder}
          value={objType === "Deck" ? formData.description : formData.back}
          formChangeHandler={formChangeHandler}
        />
        <div>
          <button
            className="btn btn-secondary mr-2"
            type="button"
            onClick={cancelHandler}
          >
            {cancelType}
          </button>
          <button className="btn btn-primary mr-2" type="submit">
            {submitType}
          </button>
        </div>
      </form>
    </>
  );
}
export default FormTemplate;
