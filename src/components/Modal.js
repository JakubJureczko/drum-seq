import React from 'react';
import ReactDOM from 'react-dom';
import "./Modal.css"
import arrow from "../assets/images/left-arrow.svg"

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">
          <h3>Upload your samples</h3>
          <button type="button" className="modal-close-button" data-dismiss="modal"  onClick={hide}>
            
          </button>
        </div>
        <div className="modalbtn">
        <button>E</button>
        <button>R</button>
        <button>T</button>
        <button>U</button>
        <button>I</button>
        <button>O</button>
        <button>D</button>
        <button>F</button>
        <button>G</button>
        <button>J</button>
        <button>K</button>
        <button>L</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;