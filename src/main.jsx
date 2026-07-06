import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"

import { Provider } from "react-redux";   // ✅ ADD THIS
import store from "./redux/store";        // ✅ ADD THIS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>   {/* ✅ CRITICAL */}
      <App />
    </Provider>
  </React.StrictMode>
);