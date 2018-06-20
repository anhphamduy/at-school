import React, { Component } from "react";
import logo from "./logo.svg";
import NavNotLoggedIn from "./components/navs/NavNotLoggedIn";
import ContentContainer from "./components/contents/ContentContainer";

class App extends Component {
  render() {
    return (
      <div style={{display: "flex", flexDirection: "row"}}> 
        <NavNotLoggedIn />
        <ContentContainer />
      </div>
    );
  }
}

export default App;
