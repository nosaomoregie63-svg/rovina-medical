import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

function renderApp() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

// Optionally enable the mock API when developing without a backend
if (import.meta.env.VITE_USE_MOCK === "true") {
  import("./apiMock").then(renderApp).catch((error) => {
    console.error("Failed to load API mock:", error);
    renderApp();
  });
} else {
  renderApp();
}
