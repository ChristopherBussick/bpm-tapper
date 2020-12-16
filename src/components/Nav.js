import React from "react";
import NavItem from "./NavItem";
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons'

function Nav( { setShowMilliseconds, playAudio, setPlayAudio } ) {

  function toggleShowMilliseconds() {
    setShowMilliseconds(showMilliseconds => !showMilliseconds);
  }

  function toggleAudio() {
    setPlayAudio(playAudio => !playAudio);
  }

  return (
    <nav className="nav">
      <NavItem type="checkbox" name="show-milliseconds-checkbox" onClick={toggleShowMilliseconds} label="Show Milliseconds" />
      <NavItem type="checkbox" styling="icon" state={playAudio} iconOn={faVolumeUp} iconOff={faVolumeMute} name="toggle-audio-button" onClick={toggleAudio} label="Toggle Audio" />
    </nav>
  );
}

export default Nav;