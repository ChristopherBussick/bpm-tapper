import React from "react";
import Nav from "./Nav";

function Navbar({ title, setShowMilliseconds, playAudio, setPlayAudio }) {
  return (
    <nav className="navbar">
      <p className="title">{title}</p>
      <Nav
        setShowMilliseconds={setShowMilliseconds}
        playAudio={playAudio}
        setPlayAudio={setPlayAudio}
      />
    </nav>
  );
}

export default Navbar;
