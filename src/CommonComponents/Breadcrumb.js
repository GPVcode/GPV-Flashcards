import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function Breadcrumb({ navTitles }) {
  const { url } = useRouteMatch();

  //Crumbs is an array of the url elements seperated by the slash
  const crumbs = url ? url.split("/") : [];

  const navItems = navTitles
    ? navTitles.map((title, index) => {
        //The last item in the navTitles is rendered differently
        if (index === navTitles.length - 1)
          return (
            <li key={index} className="breadcrumb-item " aria-current="page">
              {title}
            </li>
          );
        //The second navLink will always return to the deck view
        const crumb = crumbs.slice(0, 3).join("/");
        return (
          <li key={index} className="breadcrumb-item">
            <Link to={crumb}>{title}</Link>
          </li>
        );
      })
    : navTitles;

  //The first navLink will always be a link to HomePage
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="">
            <span
              className="oi oi-home pr-2"
              title="Home"
              aria-hidden="true"
            ></span>
            Home
          </Link>
        </li>
        {navItems}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
