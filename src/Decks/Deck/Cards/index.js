import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

function Cards({ deck, setDecks }) {
  const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${path}/:cardId/edit`}>
          <EditCard deck={deck} setDecks={setDecks} />
        </Route>
        <Route path={`${path}/new`}>
          <NewCard deck={deck} setDecks={setDecks} />
        </Route>
        <Route>
          <h1>Not a valid URL!</h1>
        </Route>
      </Switch>
    </>
  );
}
export default Cards;
