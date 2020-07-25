import React from "react";

import "./pairs.scss";

function Card(props) {
  if (props.isRevealed) {
    return (
      <button className="card" onClick={props.onClick}>
        <span className="card_content">{props.value}</span>
      </button>
    );
  } else {
    return <button className="card" onClick={props.onClick}></button>;
  }
}

function RemovedCard() {
  return <button className="card card--removed"></button>;
}

function Deck(props) {
  return props.cards.map((card, i) => {
    if (card.isMatched) {
      return <RemovedCard key={i} />;
    } else {
      return (
        <Card
          key={i}
          value={card.value}
          isRevealed={card.isRevealed}
          onClick={() => props.onClick(i)}
        />
      );
    }
  });
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.pairs = [
      { word: "menna", key: 0 },
      { word: "to go", key: 0 },
      { word: "olla", key: 1 },
      { word: "to be", key: 1 },
      { word: "never going to give you up", key: 2 },
      { word: "never going to let you down", key: 2 },
      { word: "t3", key: 3 },
      { word: "v3", key: 3 },
    ];
    this.state = {
      cards: Object.values(this.pairs)
        .map((val) => {
          return {
            value: val.word,
            key: val.key,
            isRevealed: false,
            isMatched: false,
          };
        })
        .sort(() => Math.random() - 0.5),
      matchedCards: [],
      nAttempts: 0,
    };
  }

  handleClick(i) {
    let cards = this.state.cards.slice();
    const revealedCard = cards[i];
    revealedCard.isRevealed = true;

    const revealedCards = cards.filter(
      (card) => card.isRevealed && !card.isMatched
    );

    if (revealedCards.length < 3) {
      this.setState({
        cards: cards,
      });
    }

    if (revealedCards.length === 2) {
      if (revealedCards[0].key === revealedCards[1].key) {
        setTimeout(() => {
          this.setState({
            matchedCards: this.state.matchedCards.slice().concat(revealedCards),
            cards: cards.map((card) => {
              if (card.isRevealed && !card.isMatched) {
                card.isMatched = true;
                return card;
              } else {
                return card;
              }
            }),
          });
        }, 2000);
      } else {
        setTimeout(() => {
          this.setState({
            cards: cards.map((card) => {
              card.isRevealed = false;
              return card;
            }),
          });
        }, 2000);
      }

      this.setState({
        nAttempts: this.state.nAttempts + 1,
      });
    }
  }

  renderMatches() {
    return this.state.matchedCards.map((card, i) => {
      return <Card key={i} value={card.value} isRevealed={true} />;
    });
  }

  render() {
    if (this.state.cards.filter((card) => !card.isMatched).length === 0) {
      alert(
        `Well done! You matched all the words in ${this.state.nAttempts} attempts!`
      );
    }

    return (
      <div className="game">
        <h2 className="game-title">Pairs</h2>
        <div className="game-deck">
          <Deck cards={this.state.cards} onClick={(i) => this.handleClick(i)} />
        </div>
        {/* TODO: Make removed cards just two cards per row */}
        <div className="game-info">
          <span>Matched Cards:</span>
          <div>{this.renderMatches()}</div>
          <span>Attempts: {this.state.nAttempts}</span>
        </div>
      </div>
    );
  }
}
