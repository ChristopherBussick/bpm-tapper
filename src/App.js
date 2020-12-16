import React, { useState } from "react";
import BPMDisplay from "./components/BPMDisplay";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./styles/app.scss";

function App() {

  const [showMilliseconds, setShowMilliseconds] = useState(false);

  const [playAudio, setPlayAudio] = useState(true);

  return (
    <div className="app">
      <Navbar title="BPM Tapper" setShowMilliseconds={setShowMilliseconds} playAudio={playAudio} setPlayAudio={setPlayAudio} />
      <BPMDisplay showMilliseconds={showMilliseconds} playAudio={playAudio} />
      <Footer />
    </div>
  );
}

export default App;