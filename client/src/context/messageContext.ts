import { createContext } from "react";

interface MessageContextType {
  message: string;
  setFullMessage: (message: string, isError: boolean, details?: string) => void;
  isError: boolean;
  details?: string;
  setError: (error: unknown) => void;
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined);
