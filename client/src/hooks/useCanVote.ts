import { checkCanVoteByFingerprint } from "@/services/vote";
import { isServerError } from "@/types";
import { useEffect, useState } from "react";

const useCanVote = (voteId: number, fingerprint: string) => {
  const [canVote, setCanVote] = useState(false);

  const checkCanVote = async () => {
    if (!fingerprint || isNaN(voteId)) {
      return;
    }
    try {
      await checkCanVoteByFingerprint(voteId, fingerprint);
      setCanVote(true);
    } catch (error) {
      if(isServerError(error))
      {
        setCanVote(false);
      }
    }
  };

  useEffect(() => {
    checkCanVote();
  }, [voteId, fingerprint]);

  return { canVote, checkCanVote };
};

export default useCanVote;
