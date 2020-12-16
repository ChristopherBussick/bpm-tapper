import { useEffect, useRef, useState } from "react";
import tapSound from "../res/sounds/MRNBV3_03_A_Metronome_127_Dmaj_2_Trimmed.wav";

let lastTapTime;
let lastTapTimeDifferences = [];

function BPMDisplay( { showMilliseconds, playAudio }) {

  const bpmNumberIntegerRef = useRef(null);
  
  const clipboardMessageRef = useRef(null);
  
  const audioTapRef = useRef(null);
  
  const [bpm, setBPM] = useState(0);

  const [isCalculating, setCalculating] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    // Clean up when the component is removed from the UI (Should not happen here because it is always on screen, but still keep this for proper structuring).
    return () => {
        window.removeEventListener("keydown", keyDownHandler);
    }
  }, [playAudio, isCalculating]);

  function keyDownHandler() {
    if (!isCalculating) {
      setCalculating(true);
    }
    calculateBPM();

    if (bpmNumberIntegerRef.current.classList.contains("animation-grow")) {
      bpmNumberIntegerRef.current.classList.remove("animation-grow");
    }
    // This tiny timeout is necessary, because having remove() and add() sequentially after one another does not work for whatever reason
    // TODO:
    // - Find out why this does not work sequentially
    setTimeout(function() {
      bpmNumberIntegerRef.current.classList.add("animation-grow");
    }, 1);

    if (playAudio) {
      playTapSound();
    }
  }

  function playTapSound() {
    if (audioTapRef.current.paused) {
      audioTapRef.current.play();
    } else {
      audioTapRef.current.currentTime = 0;
    }
  }

  function calculateBPM() {
    // General explanation (as I understand it):
    // If all taps had 1 second time (= 1000ms) between them, then this would equal 60 BPM => This is our point of reference.
    // => So if all taps had 0.5 seconds time between them, then this would equal 120 BPM for example.
    // The formula when having the time difference is: 1000 / timeDifference * 60 BPM = tappedBPM

    // 1. Take the time between the last tap and this current tap
    var currentTapTime = new Date().getTime();
    var currentTapTimeDifference = currentTapTime - lastTapTime;

    // Do not calculate or set the bpm on the first tap (You need at least two taps to calculate the bpm).
    if (lastTapTime) {
      // 2. Store all previous time differences between taps, add them up and divide their sum by their amount to get the average time difference
      
      // 2.1 Store all previous time differences between taps
      // Handling arrays as lists in JS: https://alligator.io/js/push-pop-shift-unshift-array-methods/
      lastTapTimeDifferences.push(currentTapTimeDifference);

      // 2.2 Add up the time differences and divide the sum by the amount of stored time differences to get the average
      var averageTimeDifference = 0;
      lastTapTimeDifferences.forEach(timeDifference => {
        averageTimeDifference = averageTimeDifference + timeDifference;
      });
      averageTimeDifference = averageTimeDifference / lastTapTimeDifferences.length;
      
      // 3. Convert the time difference into the corresponding BPM
      var currentBPM = 1000 / averageTimeDifference * 60;

      setBPM(currentBPM);
    }

    lastTapTime = currentTapTime;
  }

  function resetBPM() {
    lastTapTime = 0;
    lastTapTimeDifferences = [];
    setCalculating(false);
    setBPM(0);
  }

  function getBPMInMillisecondFormat() {
    var integers = Math.floor(bpm);
    var bpmPreparedForDecimals = Math.round(bpm * 10000);
    var amountIntegerDigits = integers.toString().length;
    var decimalPlaces = bpmPreparedForDecimals.toString().slice(amountIntegerDigits);

    // Decimal places check for when the timer is reset and only shows a "0". It should then still show decimals.
    var bpmInMSFormat = <div className="bpm-ms-format-container">
                          <div className="integers" ref={bpmNumberIntegerRef}>{integers}</div>
                          .
                          <div className="decimals">{decimalPlaces ? decimalPlaces : "0000"}</div>
                        </div>;

    return bpmInMSFormat;
  }

  function copyBPMToClipboard() {    
    var tempInputElement = document.createElement("input");
    var integers = Math.floor(bpm);
    var bpmPreparedForDecimals = Math.round(bpm * 10000);
    var amountIntegerDigits = integers.toString().length;
    var decimalPlaces = bpmPreparedForDecimals.toString().slice(amountIntegerDigits);

    var bpmInMSFormat = integers + "." + decimalPlaces;
    tempInputElement.value = showMilliseconds ? bpmInMSFormat : Math.round(bpm);

    document.body.appendChild(tempInputElement);
    tempInputElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempInputElement);

    if (clipboardMessageRef.current.classList.contains("animation-popup")) {
      clipboardMessageRef.current.classList.remove("animation-popup");
    }
    // This tiny timeout is necessary, because having remove() and add() sequentially after one another does not work for whatever reason
    // TODO:
    // - Find out why this does not work sequentially
    setTimeout(function() {
      clipboardMessageRef.current.classList.add("animation-popup");
    }, 1);
  }

  return (
    <div className="bpm-display">
      <div className="messages-and-bpm-container">
        <div className={"clipboard-message"} ref={clipboardMessageRef}>Copied to clipboard!</div>
        <div className={"start-message" + (isCalculating ? " invisible" : "")}>Tap any key to start</div>
        <div className={"bpm-number-container" + (showMilliseconds ? " baseline-align" : "")}>
          <div className="bpm-number" onClick={copyBPMToClipboard}>{showMilliseconds ? getBPMInMillisecondFormat() : <div className="integers" ref={bpmNumberIntegerRef}>{Math.round(bpm)}</div>}</div>
          <div className="bpm-label">BPM</div>
        </div>
        <button className={"reset-button" + (isCalculating ? "" : " invisible")} onClick={resetBPM}>Reset</button>
      </div>
      <audio ref={audioTapRef} src={tapSound} />
    </div>
  );
}

export default BPMDisplay;