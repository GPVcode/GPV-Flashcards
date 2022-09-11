import React from "react";
import { useHistory } from "react-router-dom"

const CreateButton = () => {
    const history = useHistory();

    return (
        <div>
        <button 
            onClick={() => {
              history.push("/decks/new")
            }}
            type="button" 
            class="btn btn-secondary ">
              + Create Deck
          </button>
        </div>
    )
}
export default CreateButton