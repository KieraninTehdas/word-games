import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./app.scss";
import Game from "./components/pairs-game/pairs";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="menu">
          <header>
            <h1>Word Games!</h1>
          </header>

          <ul className="nav_list">
            <li className="nav_list_item">
              <Link
                to="/pairs"
                style={{ textDecoration: "None", color: "inherit" }}
              >
                Pairs
              </Link>
            </li>
            <li className="nav_list_item">
              <Link
                to="/find-the-word"
                style={{ textDecoration: "None", color: "inherit" }}
              >
                Find The Word
              </Link>
            </li>
            <li className="nav_list_item">
              <Link
                to="/my-words"
                style={{ textDecoration: "None", color: "inherit" }} // TODO: Make this not inline...
              >
                My Words
              </Link>
            </li>
          </ul>
        </div>

        <div className="main">
          <Switch>
            <Route path="/pairs">
              <Game />
            </Route>
            <Route path="/find-the-word">
              <h2>Find The Word</h2>
            </Route>
            <Route path="/my-words">
              <h2>My Words</h2>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
