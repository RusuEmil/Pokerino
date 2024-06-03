import React from "react";
import "./Modal2.scss";

const ComparisonModal = ({
  handleCloseModal,
  player1Chances,
  player2Chances,
  inputValue,
}) => {
  const player1Difference = Math.abs(player1Chances - parseFloat(inputValue));
  return (
    <>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
      <div className="modal2-container">
        <div className="modal2-content">
          <span className="close-button" onClick={handleCloseModal}>
            x
          </span>
          <div className="player1">Hero : {player1Chances.toFixed(2)}%</div>
          <p className="difference">
            You were {player1Difference.toFixed(2)}% close
          </p>

          <div className="player2">Villain: {player2Chances.toFixed(2)}%</div>
        </div>
      </div>
    </>
  );
};

export default ComparisonModal;
