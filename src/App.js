import React from "react";
import "./App.css";
import Game from "./components/pairs-game/pairs";

function App() {
  return (
    <div className="app-container">
      <div className="menu">
        <header>
          <h1>Word Games!</h1>
        </header>

        <ul className="nav_list">
          <li className="nav_list_item">Pairs</li>
          <li className="nav_list_item">Find The Word</li>
          <li className="nav_list_item">My Words</li>
        </ul>
      </div>

      <div className="main">
        <Game></Game>
      </div>
    </div>
  );
}

export default App;
