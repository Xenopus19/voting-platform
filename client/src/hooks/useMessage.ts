import { MessageContext } from "@/context/messageContext";
import { useContext } from "react";

const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

export default useMessage;