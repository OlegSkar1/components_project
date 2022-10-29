import React, { Component } from "react";
import AppRouter from "AppRouter";
import { ContextState } from "./context";

class App extends Component {
  render() {
    return (
      <ContextState>
        <AppRouter />
      </ContextState>
    );
  }
}

export default App;
