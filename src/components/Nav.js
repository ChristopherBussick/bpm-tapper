import React from "react";
import NavItem from "./NavItem";

function Nav( { setShowMilliseconds }) {

  function playMetronome() {
    // todo
  }

  function toggleShowMilliseconds() {
    setShowMilliseconds(showMilliseconds => !showMilliseconds);
  }

  return (
    <nav className="nav">
      <NavItem type="checkbox" name="show-milliseconds-checkbox" onClick={toggleShowMilliseconds} label="Show Milliseconds" />
    </nav>
  );
}

export default Nav;