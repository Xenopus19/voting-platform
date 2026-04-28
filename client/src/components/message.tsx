
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert02Icon, BadgeInfoIcon } from "@hugeicons/core-free-icons";
import useMessage from "@/hooks/useMessage";

const Message = () => {
  const { message, details, isError } = useMessage();

  if (message === "") return;

  return (
    <Alert className="mt-2 mb-2" variant={isError ? 'destructive' : 'default'}>
        <HugeiconsIcon icon={isError ? Alert02Icon : BadgeInfoIcon } />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>
        {details}
      </AlertDescription>
    </Alert>
  );
};

export default Message;
