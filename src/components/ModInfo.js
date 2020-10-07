import React from 'react'
import ReactDOM from 'react-dom';
import "./ModInfo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'


 const ModInfo= ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="overlay"/>
    <div className="wrapper">
      <div className="mod">
        <div className="mod-header">
          <h3>Sink In Beats:</h3>
          <span onClick={hide}></span>
          {/* <button type="button" className="modal-close-button" data-dismiss="modal"  >
            
          </button> */}
        </div>
        <div className="modbtn">
        <ul>
          <li>Press "SPACE" to start/stop the sequencer.</li>
          <li>Press "LEFT SHIFT" to start/stop recording.</li>
          <li>You can start/stop seq and rec with mouse click.</li>
          <li>Change volume of pads by sliding the yellow dot.</li>
          <li>Change Tempo, Volume and Swing of sequencer under the turntable. </li>
          <li>Upload your samples or use default</li>
          <li>And spin that!!!</li>
          <br></br>
          <li>P.S. Don't use Safari.</li>
        </ul>
        <div className="socialmedia">
        <a href="https://github.com/JakubJureczko" target="_blank"> 
        <FontAwesomeIcon className="socialm" icon={faGithub} size="2x" style={{color:"rgb(133, 65, 243)"}} /> 
        </a>
        <a href="https://twitter.com/jakub_jureczko" target="_blank"> 
        <FontAwesomeIcon className="socialm" icon={faTwitter} size="2x" style={{color:"rgb(133, 65, 243)"}} /> 
        </a>
        </div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;
export default ModInfo
