import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import HomePage from "../HomePage";
import Decks from "../Decks";
import { listDecks } from "../utils/api";

function Layout() {
  //decks is a state variable array of each deck in the API
  const [decks, setDecks] = useState([]);

  //Loads the list of Decks from the API on startup
  useEffect(() => {
    const controller = new AbortController(); //to abort old requests

    //API call to {API_BASE_URL}/decks?_embed=cards (All cards embedded in the deck)
    async function loadDecks() {
      listDecks(controller.signal)
        .then(setDecks)
        .catch((error) => {
          if (error.name !== "AbortError") throw error;
        });
    }

    loadDecks();
    return () => controller.abort(); //cleanup
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePage decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/">
            <Decks decks={decks} setDecks={setDecks} />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
