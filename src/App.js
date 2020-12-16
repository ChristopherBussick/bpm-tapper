import React, { useState } from "react";
import BPMDisplay from "./components/BPMDisplay";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./styles/app.scss";

function App() {

  const [showMilliseconds, setShowMilliseconds] = useState(false);

  return (
    <div className="app">
      <Navbar title="BPM Tapper" setShowMilliseconds={setShowMilliseconds} />
      <BPMDisplay showMilliseconds={showMilliseconds} />
      <Footer />
    </div>
  );
}

export default App;