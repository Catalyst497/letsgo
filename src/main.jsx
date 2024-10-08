import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./GlobalRedux/store.js";
import App from "./App.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
// import './index.css'

if (import.meta.env.NODE_ENV === "production") {
  disableReactDevTools()
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);
