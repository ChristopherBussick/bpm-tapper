import React from "react";
import Nav from "./Nav";

function Navbar( { title, setShowMilliseconds }) {

  return (
    <nav className="navbar">
      <p className="title">{title}</p>
      <Nav setShowMilliseconds={setShowMilliseconds} />
    </nav>
  );
}

export default Navbar;