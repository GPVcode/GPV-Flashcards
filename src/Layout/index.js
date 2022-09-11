import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckIndex from "./DeckIndex";
import CreateButton from "./CreateButton";
import New from "./decks/New";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { useState, useEffect} from 'react'


function Layout() {

  const [decks, setDecks] = useState([]);
  
  useEffect(() => {
    const getDecks = async () => {
      const decksFromServer = await fetchDecks()
      setDecks(decksFromServer)
    }

    getDecks()
  }, [])



 // Fetch Decks
  const fetchDecks = async () => {
    const res = await fetch('http://localhost:5000/decks')
    const data = await res.json()
    return data
  }
    // setDeck((currentdeck) => currentDeck.filter((d, index) => index !== indexToDelete)
  // Create Deck
  const createDeck = async (deck) => {
    const res = await fetch('http://localhost:5000/decks')

    const data = await res.json()

    setDecks([...decks, data])
    // const id = Math.floor(Math.random() * 1) + 1;
    // const newDeck = { id, ...deck}
    // setDecks([...decks, newDeck])
  }

  
  //Delete Task
  const deleteDeck = (id) => {
    window.confirm('Delete this deck?\n\nYou will not be able to recover it.')
    setDecks(decks.filter((deck) => deck.id !== id))
  }

  return (
    <>
      <Router>
      <Header />
      <div className='container'>
        <div className='my-3'>
        <Link to="/decks/new">
          <CreateButton />
        </Link>
        </div>
        <Switch>
          <Route path="/decks/new">
            <New />
          </Route>
          <Route >
            <DeckIndex decks={decks} onAdd={createDeck} onDelete={deleteDeck}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
      </Router>
    </>
  );
}

export default Layout;