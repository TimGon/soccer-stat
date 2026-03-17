import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ErrorProvider } from "./contexts/ErrorContext.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorProvider>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ruLocale}
        >
          <App />
        </LocalizationProvider>
      </ErrorProvider>
    </BrowserRouter>
  </StrictMode>,
);
