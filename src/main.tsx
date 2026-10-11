import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./guard/protectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    </BrowserRouter>
  </StrictMode>,
);
