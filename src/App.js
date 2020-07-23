import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} className="header_logo" alt="logo" />
        <h1 className="header_title">Word Games!</h1>
      </header>

      <div className="nav">
        <ul className="nav_list">
          <li className="nav_list_item">Pairs</li>
          <li className="nav_list_item">Find The Word</li>
          <li className="nav_list_item">My Words</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
