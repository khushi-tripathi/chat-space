import React from "react";
import PageRoutes from "./PageRoutes";
import "./app.scss";
// import "../src/styles";
// import socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:4000');

import { Provider } from "react-redux";
import store from "./store";
// import App from './components/App'
// import configureStore from "./configureStore";

function App() {
  return (
    <Provider store={store}>
      <PageRoutes />;
    </Provider>
  );
}

export default App;
