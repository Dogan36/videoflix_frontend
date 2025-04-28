import React, { useState } from "react";
import { ToastContext } from "./ToastContext";
import ToastWrapper from "../components/ToastWrapper";
import Toast from "../components/Toast";

export function ToastProvider({ children }) {
  const [isShown, setIsShown]       = useState(false);
  const [type,    setType]          = useState("error");
  const [message, setMessage]       = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonAction, setButtonAction] = useState(() => () => {});

  // 1) Methode, um einen Toast anzuzeigen
  function showToast({ message, type = "error", buttonText = "", buttonAction = () => {} }) {
    setMessage(message);
    setType(type);
    setButtonText(buttonText);
    setButtonAction(() => buttonAction);
    setIsShown(true);
  }

  // 2) Methode, um ihn wieder auszublenden
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

      {/* 3) Hier wird der Toast gerendert, wenn isShown === true */}
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