import { checkCanVoteByFingerprint } from "@/services/vote";
import { isServerError } from "@/types";
import { useCallback, useEffect, useState } from "react";

const useCanVote = (voteId: number, fingerprint: string) => {
  const [canVote, setCanVote] = useState(false);

  const checkCanVote = useCallback(async () => {
    if (!fingerprint || isNaN(voteId)) {
      return false;
    }
    try {
      await checkCanVoteByFingerprint(voteId, fingerprint);
      return true;
    } catch (error) {
  
      if (isServerError(error)) {
        return false;
      }
      throw error;
    }
  }, [voteId, fingerprint]);

  useEffect(() => {
    let isMounted = true;
    checkCanVote()
      .then((result) => {
        if (isMounted) {
          setCanVote(result);
        }
      })
      .catch((err) => {
        console.error("Error checking vote status:", err);
      });

    return () => {
      isMounted = false; 
    };
  }, [checkCanVote]);

  return { canVote, checkCanVote };
};

export default useCanVote;
