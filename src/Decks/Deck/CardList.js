import React, { useEffect, useState } from "react";
import CardListItem from "./CardListItem";

function CardList({ cards, setDecks }) {
  //useState variable to store an array of CardListItem components
  const [cardList, setCardList] = useState([]);

  //Update cardList whenever there is a change to cards or setCards
  useEffect(() => {
    //map through every card in cards to create a CardListItem for each.
    setCardList(
      cards?.map((card, key) => (
        <CardListItem key={key} card={card} setDecks={setDecks} />
      ))
    );
  }, [cards, setDecks]);

  //Parent component DeckView is handling the LoadingMessage, so just return the list
  return <div className="list-group">{cardList}</div>;
}

export default CardList;
