import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({ cards }) {
  const history = useHistory();
  const defaultStudyState = { index: 0, flipped: false, freshView: true };
  const [studyState, setStudyState] = useState(defaultStudyState);

  //On Flip, "freshView" becomes false and "flipped" becomes the opposite of what it was
  function flipHandler() {
    setStudyState({
      ...studyState,
      flipped: !studyState.flipped,
      freshView: false,
    });
  }

  //On Next, "freshView" becomes true and "index" is incremented, unless it's the last card, then we ask to restart
  function nextHandler() {
    if (studyState.index < cards.length - 1)
      setStudyState({
        index: studyState.index + 1,
        flipped: false,
        freshView: true,
      });
    else restartCards();
  }

  //If user confirms, then we return to the defaultStudyState, otherwise we navigate to the HomePage.
  function restartCards() {
    if (
      window.confirm(
        `Restart cards?\n\n Click "cancel" to return to the home page`
      )
    )
      setStudyState(defaultStudyState);
    else history.push("");
  }

  return (
    <div className="card tg-bg-light">
      <div className="card-body">
        <h2 className="card-title">
          {/*Shows user how far into the studySession they are */}
          Card {studyState.index + 1} of {cards.length}
        </h2>
        <p className="card-text">
          {/* if studyState is flipped, we see the back of the current card, otherwise we see the front */}
          {studyState.flipped
            ? cards[studyState.index].back
            : cards[studyState.index].front}
        </p>
        <button className="btn btn-secondary mr-3" onClick={flipHandler}>
          Flip
        </button>
        {/* Next button only appears if it's not a freshView of the card */}
        {studyState.freshView ? null : (
          <button className="btn btn-primary mr-3" onClick={nextHandler}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
export default StudyCard;
