import React from "react"

import { BrowserRouter as Router, Route } from "react-router-dom"

import Navbar from "../components/Nav"
import Home from "../routes/Home"
import Detail from "../routes/Detail"
import About from "../routes/About"
import Contribute from "../routes/Contribute"


function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/article/:id" component={Detail} />
      <Route path="/about" component={About} />
      <Route path="/contribute" component={Contribute} />
      {/* <Redirect from="*" to="/" /> */}
    </Router>
  );
}

export default App;
