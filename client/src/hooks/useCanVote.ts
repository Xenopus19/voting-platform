import { checkCanVoteByFingerprint } from "@/services/vote";
import { isServerError } from "@/types";
import { useCallback, useEffect, useState } from "react";

const useCanVote = (voteId: number, fingerprint: string) => {
  const [canVote, setCanVote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkCanVote = useCallback(async () => {
    setIsLoading(true);
    try {
      await checkCanVoteByFingerprint(voteId, fingerprint);
      setCanVote(true);
      return true;
    } catch (error) {
      setCanVote(false);
      if (isServerError(error)) return false;
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [voteId, fingerprint]);

  useEffect(() => {
    let isMounted = true;

    const performCheck = async () => {
      await checkCanVote();
      if (!isMounted) return;
    };

    performCheck();

    return () => {
      isMounted = false;
    };
  }, [checkCanVote]); 

  return { canVote, isLoading, checkCanVote };
};

export default useCanVote;
