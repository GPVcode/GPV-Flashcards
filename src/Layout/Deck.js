import React from "react";
import StudyButton from './StudyButton'

//use link here

const Deck = ({ deck, onDelete}) => {

    const studyButton = (study) => {
        console.log('study time!')
    }

    
    const view = () => {
        console.log('View Button!')
    }
    
    return (
    <div className='border p-4 h-100 '>
        <div className='d-flex flex-row justify-content-between'>
            <h1>{deck.name}</h1>
            <p>deckId.length</p>
        </div>
        <p>{deck.description}</p>
        <div className='container d-flex flex-row'> 
            <div className='col-10'>
                <button onClick={view} type="button" class="btn btn-secondary mx-2">View</button>
                <StudyButton onClick={studyButton}/>
            </div>
            <div className='2'>
                <button onClick={() => onDelete(deck.id)} type="button" class="btn btn-danger">Delete</button>
            </div>

        </div>
    </div>
    )
}

export default Deck