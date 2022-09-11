import React from 'react'
import Deck from './Deck'


const DeckIndex = ({ decks, onDelete }) => {

    const onSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div >
            {decks.map((deck, index) => (
                <Deck 
                    key={index} 
                    deck={deck} 
                    onDelete={onDelete} 
                    onSubmit={onSubmit}
                />
            ))}
        </div>
    )

}

export default DeckIndex