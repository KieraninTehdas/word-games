import React from "react";
import { Link } from "react-router-dom";
import "./nav.scss";

function Nav() {
  return (
    <nav className="menu">
      <header>
        <h1>Word Games!</h1>
      </header>

      <ul className="nav_list">
        <Link to="/pairs">
          <li className="nav_list_item">Pairs</li>
        </Link>
        <Link to="/find-the-word">
          <li className="nav_list_item">Find The Word</li>
        </Link>
        <Link to="/my-words">
          <li className="nav_list_item">My Words</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
