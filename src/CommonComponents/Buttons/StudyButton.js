import React from "react";
import { Link } from "react-router-dom";

function StudyButton({ path }) {
  return (
    <>
      <Link className="mr-3" to={`${path}/study`}>
        <button className="btn btn-primary">
          <span
            className="oi oi-book pr-1"
            title="book"
            aria-hidden="true"
          ></span>
          Study
        </button>
      </Link>
    </>
  );
}

export default StudyButton;
