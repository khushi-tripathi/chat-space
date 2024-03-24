import React from "react";
import PageRoutes from "./PageRoutes";
import "./app.scss";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  )
}

export default App;
