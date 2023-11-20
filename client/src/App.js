import React from "react";
import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./components/layout/Footer/Footer.js";

function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto:300,400,700", "sans-serif"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
