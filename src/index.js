import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StrictMode>
      <div className="container">
        <App />
      </div>
    </StrictMode>
  </BrowserRouter>
);
