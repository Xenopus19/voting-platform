import { MessageContext } from "@/context/messageContext";
import { isServerError } from "@/types";
import React, { useState } from "react";

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [details, setDetails] = useState("");

  const setFullMessage = (
    message: string,
    isError: boolean = false,
    details?: string,
  ) => {
    setMessage(message);
    setIsError(isError);
    if (details) {
      setDetails(details);
    }

    setTimeout(() => {
      setMessage("");
      setIsError(false);
      setDetails("");
    }, 5000);
  };

  const setError = (error: unknown) => {
    if (!isServerError(error)) {
      setFullMessage("An error occured.", true);
      return;
    }

    setFullMessage(error.message, true, error.details);
  };

  return (
    <MessageContext.Provider
      value={{ message, details, isError, setFullMessage, setError }}
    >
      {children}
    </MessageContext.Provider>
  );
};


