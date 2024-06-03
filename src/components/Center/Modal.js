import React, { useState } from "react";
import "./Modal.scss";

const Modal = ({ handleCloseModal, handleInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputSubmit = () => {
    handleInputChange(inputValue);
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
      <div className="modal-container">
        <div className="modal-content">
          <span className="close-button" onClick={handleCloseModal}>
            x
          </span>
          <input
            type="number"
            placeholder="Enter your guess"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleInputSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
