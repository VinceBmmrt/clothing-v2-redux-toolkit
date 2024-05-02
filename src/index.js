import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import { store } from "./store/store";
import { stripePromise } from "./utils/stripe/stripe.utils";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Elements>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  rootElement
);
