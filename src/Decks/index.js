import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Deck from "./Deck";
import NewDeck from "./NewDeck";

function Decks({ decks, setDecks }) {
  const { url } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${url}/new`}>
          <NewDeck decks={decks} setDecks={setDecks} />
        </Route>
        <Route path={`${url}/:deckId`}>
          <Deck decks={decks} setDecks={setDecks} />
        </Route>
        <Route>
          <h1>Not a valid URL!</h1>
        </Route>
      </Switch>
    </>
  );
}

export default Decks;
