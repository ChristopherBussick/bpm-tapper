import React, { useState } from "react";
import BPMDisplay from "./components/BPMDisplay";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import "./styles/app.scss";

function App() {

  const [showMilliseconds, setShowMilliseconds] = useState(false);

  return (
    <div className="app">
      <Nav setShowMilliseconds={setShowMilliseconds} />
      <BPMDisplay showMilliseconds={showMilliseconds} />
      <Footer />
    </div>
  );
}

export default App;