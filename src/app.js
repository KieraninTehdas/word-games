import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.scss";
import Nav from "./components/nav/nav";
import Game from "./components/pairs-game/pairs";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Nav />

        <div className="main">
          <Switch>
            <Route path="/pairs" component={Game} />
            <Route path="/find-the-word" component={Find} />
            <Route path="/my-words" component={MyWords} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Find() {
  return <h2>Find The Word</h2>;
}

function MyWords() {
  return <h2>My Words</h2>;
}

export default App;
