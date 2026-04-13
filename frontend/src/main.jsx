import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { ToastContainer } from "react-toastify";
import { applyTheme } from "./hooks/useTheme";

const savedTheme = localStorage.getItem("theme");
const initialTheme =
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

applyTheme(initialTheme);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  // </StrictMode>,
);
