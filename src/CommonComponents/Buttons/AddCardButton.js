import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function AddCardButton() {
  const { url } = useRouteMatch();
  const path = url.split("/").slice(0, 3).join("/");
  return (
    <>
      <Link className="mr-3" to={`${path}/cards/new`}>
        <button className="btn btn-primary">
          <span
            className="oi oi-plus pr-2"
            title="plus"
            aria-hidden="true"
          ></span>
          Add Cards
        </button>
      </Link>
    </>
  );
}

export default AddCardButton;
