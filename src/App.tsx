import React, { Component } from "react";
import AppRouter from "AppRouter";
import { ContextState } from "./context";
import { Provider } from "react-redux";
import { store } from "store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ContextState>
          <AppRouter />
        </ContextState>
      </Provider>
    );
  }
}

export default App;
