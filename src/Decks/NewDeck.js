import React from "react";
import Breadcrumb from "../CommonComponents/Breadcrumb";
import FormTemplate from "../CommonComponents/Forms/FormTemplate";

function NewDeck({ decks, setDecks }) {
  return (
    <>
      <Breadcrumb navTitles={["Create Deck"]} />
      <FormTemplate
        objToModify={{}}
        objType="Deck"
        modifyType="Add"
        decks={decks}
        setDecks={setDecks}
      />
    </>
  );
}

export default NewDeck;
