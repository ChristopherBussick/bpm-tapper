import React from "react";
import NavItem from "./NavItem";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

function Nav({ setShowMilliseconds, playAudio, setPlayAudio }) {
  function toggleShowMilliseconds() {
    setShowMilliseconds((showMilliseconds) => !showMilliseconds);
  }

  function toggleAudio() {
    setPlayAudio((playAudio) => !playAudio);
  }

  return (
    <nav className="nav">
      <NavItem
        type="checkbox"
        name="show-milliseconds-checkbox"
        onClick={toggleShowMilliseconds}
        label="Show Milliseconds"
      />
      <NavItem
        type="checkbox"
        styling="icon"
        name="toggle-audio-button"
        state={playAudio}
        onClick={toggleAudio}
        iconOn={faVolumeUp}
        iconOff={faVolumeMute}
        labelOn="Turn audio off"
        labelOff="Turn audio on"
      />
    </nav>
  );
}

export default Nav;
