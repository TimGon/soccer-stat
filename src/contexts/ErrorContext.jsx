import React, { useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const ErrorContext = React.createContext();

export function useError() {
  return useContext(ErrorContext);
}

export function ErrorProvider({ children }) {
  const [open, setOpen] = useState(false),
    [message, setMessage] = useState("");

  const showError = (msg) => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </ErrorContext.Provider>
  );
}
