import React from "react";
import { useRouteMatch } from "react-router-dom";
import AddCardButton from "../../CommonComponents/Buttons/AddCardButton";

function NotEnoughCards({ cards }) {
  const { url } = useRouteMatch();
  return (
    <>
      <h2 className="h2">Not enough cards.</h2>
      <p className="tg-text-light">
        You need at least 3 cards to study. there are {cards.length} cards in
        this deck.
      </p>
      <AddCardButton path={url} />
    </>
  );
}

export default NotEnoughCards;
