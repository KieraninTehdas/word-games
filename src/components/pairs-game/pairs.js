import React from "react";

import "./pairs.css";

function Card(props) {
  if (props.isRevealed) {
    return (
      <button className="revealed-card" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button className="concealed-card" onClick={props.onClick}>
        {null}
      </button>
    );
  }
}

function RemovedCard() {
  return <button className="removed-card"></button>;
}

function Deck(props) {
  const cards = props.cards.map((card, i) => {
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
  return generateRows(4, cards, "deck-row");
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.pairs = [
      { word: "menna", key: 0 },
      { word: "to go", key: 0 },
      { word: "olla", key: 1 },
      { word: "to be", key: 1 },
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
    const cards = this.state.matchedCards.map((card, i) => {
      return <Card key={i} value={card.value} isRevealed={true} />;
    });

    return generateRows(2, cards, "matched-row");
  }

  render() {
    if (this.state.cards.filter((card) => !card.isMatched).length === 0) {
      alert(
        `Well done! You matched all the words in ${this.state.nAttempts} attempts!`
      );
    }

    return (
      <div className="game">
        <div className="game-deck">
          <Deck cards={this.state.cards} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>Matched Cards:</div>
          {this.renderMatches()}
          <div>Attempts: {this.state.nAttempts}</div>
        </div>
      </div>
    );
  }
}

function generateRows(nColumns, contents, divClassName) {
  const nFullRows = Math.floor(contents.length / nColumns);
  const rows = [];

  let i = 0;

  while (i <= nFullRows) {
    let rowContent;

    if (i < nFullRows) {
      rowContent = contents.slice(i * nColumns, (i + 1) * nColumns);
    } else {
      rowContent = contents.slice(i * nColumns);
    }

    rows.push(
      <div className={divClassName} key={i}>
        {rowContent}
      </div>
    );

    i += 1;
  }

  return <div>{rows}</div>;
}
