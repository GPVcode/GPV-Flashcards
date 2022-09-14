import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../CommonComponents/Breadcrumb";
import LoadingMessage from "../../CommonComponents/LoadingMessage";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import StudyCard from "./StudyCard";

function StudyDeck() {
  const { deckId } = useParams(); //Used to grab the "current" deck
  const [deck, setDeck] = useState({});
  const cards = deck.cards;
  //Loads the current deck from the API whenever deckId or cards changes
  useEffect(() => {
    const controller = new AbortController(); //to abort old requests

    //API call to /decks/{deckId}?_embed=cards (All cards embedded in the deck)
    async function loadCards() {
      readDeck(deckId, controller.signal)
        .then(setDeck)
        .catch((error) => {
          if (error.name !== "AbortError") throw error;
        });
    }

    if (!cards) loadCards(); //if there are no cards, load 'em up
    return () => controller.abort(); //cleanup
  }, [deckId, cards]);

  return cards ? (
    <>
      <Breadcrumb navTitles={[deck?.name, "Study"]} />
      <h1 className="h1">Study: {deck?.name}</h1>
      {cards.length < 3 ? (
        <NotEnoughCards cards={cards} />
      ) : (
        <StudyCard cards={cards} />
      )}
    </>
  ) : (
    <LoadingMessage />
  );
}
export default StudyDeck;
