import React from "react";

const Card = ({ cards, card }) => {
    return (
        <div className="container">
            <h3>{`Card ${card.id} of ${cards.length}`}</h3>

        </div>
    )
}


export default Card