import ReactDOM from "react-dom/client";
import "./index.css";
import RouterApp from "./RouterApp.jsx";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>
);
