import React from "react";
import DeckList from "./DeckList";

function HomePage({ decks, setDecks }) {
  return <DeckList decks={decks} setDecks={setDecks} />;
}

export default HomePage;
