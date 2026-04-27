import { isServerError } from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";

interface MessageContextType {
  message: string;
  setFullMessage: (message: string, isError: boolean, details?: string) => void;
  isError: boolean;
  details?: string;
  setError: (error: any) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

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

  const setError = (error: any) => {
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

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
