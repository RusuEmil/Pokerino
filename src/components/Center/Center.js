import cardData from "../Deck/deck.json";
import { useState, useEffect } from "react";
import "./Center.scss";
import { TexasHoldem } from "poker-odds-calc";
import Modal from "./Modal";
import Modal2 from "./Modal2";

const getRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex];
};

const generateUniqueCards = (numCards, currentUniqueCards) => {
  const newCards = [];
  while (newCards.length < numCards) {
    const newCard = getRandomCard();
    if (
      !newCards.some((card) => newCard.id === card.id) &&
      !currentUniqueCards.some((card) => newCard.id === card.id)
    ) {
      newCards.push(newCard);
    }
  }
  return newCards;
};

const Center = () => {
  const [communityCards, setCommunityCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [turnCard, setTurnCard] = useState();
  const [player1Chances, setPlayer1Chances] = useState(null);
  const [player2Chances, setPlayer2Chances] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
    setModalOpen(false);
    setComparisonModalOpen(true);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClick = (numCards, isCommunity) => {
    if (isCommunity) {
      const newCommunityCards = generateUniqueCards(numCards, [...playerCards]);
      setCommunityCards(newCommunityCards);
    } else {
      const newPlayerCards = generateUniqueCards(numCards, [...communityCards]);
      setPlayerCards(newPlayerCards);
    }
  };

  const handleGeneratePlayer2Cards = () => {
    const newPlayer2Cards = generateUniqueCards(2, [
      ...communityCards,
      ...playerCards,
    ]);
    setPlayer2Cards(newPlayer2Cards);
  };

  const generateTurnCard = () => {
    if (communityCards.length >= 3) {
      const newTurnCard = generateUniqueCards(1, [
        ...communityCards,
        ...playerCards,
        ...player2Cards,
      ]);
      setTurnCard(newTurnCard[0]);
      console.log(newTurnCard[0]);
    }
  };

  useEffect(() => {
    if (!playerCards.length || !player2Cards.length || !communityCards.length) {
      return;
    }
    const Table = new TexasHoldem();
    Table.exhaustive();
    Table.addPlayer([playerCards[0].id, playerCards[1].id])
      .addPlayer([player2Cards[0].id, player2Cards[1].id])
      .boardAction((board) => {
        board.setFlop([
          communityCards[0].id,
          communityCards[1].id,
          communityCards[2].id,
        ]);
      });
    console.log(Table);
    if (turnCard?.id) {
      Table.boardAction((board) => {
        board.setTurn(turnCard.id);
      });
    }
    console.log();

    const Result = Table.calculate();
    console.log(Result);

    const player1Wins = Result.result.players[0].wins;
    const player2Wins = Result.result.players[1].wins;

    const player1Odds = (player1Wins / Result.result.iterations) * 100;
    const player2Odds = (player2Wins / Result.result.iterations) * 100;
    setPlayer1Chances(player1Odds);
    setPlayer2Chances(player2Odds);

    console.log("Player 1 Win Odds:", player1Odds);
    console.log("Player 2 Win Odds:", player2Odds);
    console.log("board", Result);
  }, [playerCards, player2Cards, communityCards, turnCard]);

  return (
    <>
      <div className="container">
        <div className="player2-container">
          <div className="cards-chances2">
            <div className="player2-cards">
              {player2Cards.map((card, index) => (
                <img key={index} src={card.cardimage} alt={card.id} />
              ))}
              <button
                className="button-player2"
                onClick={handleGeneratePlayer2Cards}
              >
                Generate cards for the Villain
              </button>
            </div>
          </div>
        </div>
        <div className="middle-container">
          <div className="community-container">
            <div className="flop-container">
              {communityCards.map((card, index) => (
                <img key={index} src={card.cardimage} alt={card.id} />
              ))}
            </div>
            <div className="turn">
              {turnCard && <img src={turnCard.cardimage} alt={turnCard.id} />}
            </div>
          </div>

          <div className="buttons-container">
            <button onClick={() => handleClick(3, true)}>Generate Flop</button>
            <button
              onClick={generateTurnCard}
              disabled={communityCards.length < 3}
            >
              Generate Turn Card
            </button>
            {communityCards.length >= 3 && (
              <button className="button-guess" onClick={handleOpenModal}>
                Guess The chances?
              </button>
            )}
          </div>
        </div>

        <div className="player1-container">
          <div className="cards-chances1">
            {playerCards.map((card, index) => (
              <img key={index} src={card.cardimage} alt={card.id} />
            ))}
          </div>
          <button
            className="button-player1"
            onClick={() => handleClick(2, false)}
          >
            Generate cards for the Hero
          </button>
        </div>
      </div>
      {modalOpen && (
        <Modal
          handleCloseModal={() => setModalOpen(false)}
          handleInputChange={handleInputChange}
        />
      )}
      {comparisonModalOpen && (
        <Modal2
          className="modal2"
          player1Chances={player1Chances}
          player2Chances={player2Chances}
          inputValue={inputValue}
          handleCloseModal={() => setComparisonModalOpen(false)}
        />
      )}
    </>
  );
};

export default Center;
