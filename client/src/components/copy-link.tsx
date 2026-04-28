import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CopyLink = () => {
  const [pageUrl ] = useState(typeof window !== "undefined" ? window.location.href : "");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Copy error:", err);
    }
  };

  return (
    <div className="mt-2 mb-2 gap-2 flex flex-col">
      <p>Send the link below to voters:</p>
      <div className="flex flex-row">
        <Input readOnly value={pageUrl}></Input>
        <Button className="w-13" variant={isCopied ? "outline" : "default"} onClick={handleCopy}>
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default CopyLink;
