import React, { useState } from "react";
import { ToastContext } from "./ToastContext";
import ToastWrapper from "../components/ToastWrapper";
import Toast from "../components/Toast";

/**
 * ToastProvider component that provides a context for displaying toast notifications.
 * It manages the state of the toast and provides methods to show and hide it.
 */
export function ToastProvider({ children }) {
  const [isShown, setIsShown]       = useState(false);
  const [type,    setType]          = useState("error");
  const [message, setMessage]       = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonAction, setButtonAction] = useState(() => () => {});

  function showToast({ message, type = "error", buttonText = "", buttonAction = () => {} }) {
    setMessage(message);
    setType(type);
    setButtonText(buttonText);
    setButtonAction(() => buttonAction);
    setIsShown(true);
  }

  function hideToast() {
    setIsShown(false);
    setType("error");
    setMessage("");
    setButtonText("");
    setButtonAction(() => () => {});
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {isShown && (
        <ToastWrapper>
          <Toast
            message={message}
            type={type}
            buttonText={buttonText}
            onAction={() => {
              buttonAction();
              hideToast();
            }}
            onClose={hideToast}
          />
        </ToastWrapper>
      )}
    </ToastContext.Provider>
  );
}